"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

/**
 * 히어로 유리 뷰포트 안에서 도는 추상 볼륨 필드.
 * ── 특정 프로젝트에 종속되지 않는 사이트의 브랜드 오브젝트입니다.
 *
 * 레이마칭 프래그먼트 셰이더 하나로 그리며(라이브러리 없음),
 * · 해상도를 CSS 크기의 0.72배로 낮춰 렌더 → 부드러운 볼륨감과 성능을 동시에
 * · 구와 교차하는 구간만 마칭 → 픽셀당 표본 수가 항상 42개로 일정
 * · 뷰포트 밖·탭 비활성 시 정지, WebGL 이 없으면 CSS 그라디언트로 대체
 * · prefers-reduced-motion 이면 한 프레임만 그리고 정지
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPtr;
uniform float uDark;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.11, 0.27, 0.43));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
    mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 3; i++) {
    s += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}

mat3 rotY(float a) {
  float c = cos(a), s = sin(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

mat3 rotX(float a) {
  float c = cos(a), s = sin(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
}

/** 동심 셸 + 슬라이스 결로 짜인 반투명 볼륨 */
float density(vec3 p) {
  float r = length(p);
  float edge = smoothstep(1.02, 0.86, r);
  float n = fbm(p * 1.6 + vec3(0.0, uTime * 0.06, uTime * 0.02));
  float warp = 0.78 + 0.44 * n;
  float shells = pow(0.5 + 0.5 * sin(r * 24.0 * warp), 2.0);
  float slices = pow(0.5 + 0.5 * sin(p.y * 20.0), 2.0);
  float core = exp(-r * r * 3.0) * 0.35;
  return edge * (0.22 + 0.78 * mix(shells, slices, 0.45) + core);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  vec3 ro = vec3(0.0, 0.0, 4.8);
  vec3 rd = normalize(vec3(uv, -1.35));

  mat3 rot = rotY(uTime * 0.11 + uPtr.x * 0.42) * rotX(-0.22 + uPtr.y * 0.3);
  ro = rot * ro;
  rd = rot * rd;

  float R = 1.02;
  float b = dot(ro, rd);
  float c = dot(ro, ro) - R * R;
  float h = b * b - c;
  if (h < 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }
  h = sqrt(h);
  float t0 = max(-b - h, 0.0);
  float t1 = -b + h;
  float dt = (t1 - t0) / 42.0;

  vec4 acc = vec4(0.0);
  float t = t0 + dt * 0.5;

  for (int i = 0; i < 42; i++) {
    vec3 p = ro + rd * t;
    float d = density(p);
    if (d > 0.002) {
      float ramp = clamp(0.5 + 0.52 * p.y + 0.22 * p.x, 0.0, 1.0);
      // 밝은 공간에서는 짙은 유리처럼, 어두운 공간에서는 발광체처럼 칠합니다
      vec3 cool = mix(vec3(0.13, 0.45, 0.52), vec3(0.34, 0.75, 0.82), uDark);
      vec3 warm = mix(vec3(0.64, 0.43, 0.21), vec3(0.87, 0.66, 0.46), uDark);
      vec3 vio = mix(vec3(0.34, 0.32, 0.62), vec3(0.60, 0.56, 0.89), uDark);
      vec3 col = mix(mix(vio, cool, smoothstep(0.0, 0.55, ramp)), warm, smoothstep(0.55, 1.0, ramp));
      float a = d * dt * mix(2.3, 1.5, uDark);
      acc.rgb += (1.0 - acc.a) * col * a * mix(1.05, 3.1, uDark);
      acc.a += (1.0 - acc.a) * a;
      if (acc.a > 0.96) break;
    }
    t += dt;
  }

  gl_FragColor = vec4(acc.rgb, acc.a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function VolumeField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [failed, setFailed] = useState(false);
  const { resolvedTheme } = useTheme();
  const darkRef = useRef(0);

  useEffect(() => {
    darkRef.current = resolvedTheme === "dark" ? 1 : 0;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = (canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    }) ?? null) as WebGLRenderingContext | null;

    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPtr = gl.getUniformLocation(program, "uPtr");
    const uDark = gl.getUniformLocation(program, "uDark");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const SCALE = 0.72;
    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const w = Math.max(2, Math.round(width * SCALE));
      const h = Math.max(2, Math.round(height * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    io.observe(wrap);

    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.current.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.current.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      pointer.current.tx = 0;
      pointer.current.ty = 0;
    };
    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      wrap.addEventListener("pointerleave", onLeave);
    }

    let raf = 0;
    let last = 0;
    const start = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (now - last < 22) return;
      last = now;

      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.045;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.045;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.uniform2f(uPtr, pointer.current.x, pointer.current.y);
      gl.uniform1f(uDark, darkRef.current);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (reduced) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      {failed ? (
        <div
          className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "conic-gradient(from 210deg, rgb(var(--cool) / 0.55), rgb(var(--warm) / 0.42), rgb(var(--violet) / 0.45), rgb(var(--cool) / 0.55))",
            filter: "blur(26px)",
          }}
        />
      ) : (
        <canvas ref={canvasRef} className="size-full" style={{ display: "block" }} />
      )}
    </div>
  );
}
