import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { createTractor } from './TractorModel';
import { createFarmEnvironment } from './FarmEnvironment';

/**
 * 3D Interactive Tractor Farm Canvas
 * Realistic Three.js Tractor driving left-to-right (Login -> Signup)
 * and right-to-left (Signup -> Login) along a farm road.
 */
export default function TractorFarmCanvas({
  mode = 'login',
  isTransitioning = false,
  onTransitionComplete,
  onProgress,
  className = '',
}) {
  const containerRef = useRef(null);
  const onCompleteRef = useRef(onTransitionComplete);
  onCompleteRef.current = onTransitionComplete;
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const mouseRef = useRef({ x: 0, y: 0 });

  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    tractor: null,
    farm: null,
    animFrameId: null,
    clock: new THREE.Clock(),
    speed: 0,
    isDriving: false,
    direction: 1, // 1 for left-to-right, -1 for right-to-left
    currentX: mode === 'login' ? -3.6 : 3.6,
    prevMode: mode,
    driveTimeline: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Scene Setup ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd1fae5); // Soft morning sky
    scene.fog = new THREE.FogExp2(0xd1fae5, 0.016);

    // ── 2. Camera Setup ──
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 150);
    // Framing to showcase tractor, dirt road, crop rows, and background trees
    const startX = mode === 'login' ? -3.6 : 3.6;
    camera.position.set(startX * 0.35, 4.5, 13.0);
    camera.lookAt(startX * 0.45, 1.3, 0);

    // ── 3. WebGL Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ── 4. Natural Agricultural Lighting ──
    const ambientLight = new THREE.AmbientLight(0xecfdf5, 1.15);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.3);
    sunLight.position.set(15, 22, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x14532d, 0.65);
    scene.add(hemiLight);

    // ── 5. Farm Environment & Tractor ──
    const farm = createFarmEnvironment();
    scene.add(farm.group);

    const tractor = createTractor({ bodyColor: 0x048B62 });
    scene.add(tractor.group);

    // Position initial tractor
    tractor.group.position.set(startX, 0.02, 0);
    // Facing right (+X) for login, facing left (-X) for signup
    tractor.group.rotation.y = mode === 'login' ? Math.PI / 2 : -Math.PI / 2;

    stateRef.current = {
      ...stateRef.current,
      scene,
      camera,
      renderer,
      tractor,
      farm,
      currentX: startX,
      prevMode: mode,
    };

    // ── 6. Mouse/Pointer Parallax ──
    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };
    container.addEventListener('pointermove', onPointerMove);

    // ── 7. Animation / Render Loop (60 FPS) ──
    let lastTime = performance.now();

    function renderLoop() {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const state = stateRef.current;
      if (state.tractor && state.farm) {
        // Update wheels rotation, dust particle simulation, and engine idle oscillation
        state.tractor.update(delta, state.speed, state.isDriving, state.direction);
        state.farm.update(delta);

        // Smooth camera follow as the tractor moves or idles
        const tractorX = state.tractor.group.position.x;
        const targetCamX = tractorX * 0.4 + mouseRef.current.x * 0.7;
        const targetCamY = 4.5 + Math.sin(now * 0.0015) * 0.05 + mouseRef.current.y * 0.35;

        camera.position.x += (targetCamX - camera.position.x) * 0.06;
        camera.position.y += (targetCamY - camera.position.y) * 0.06;
        camera.lookAt(tractorX * 0.48, 1.25, 0);
      }

      renderer.render(scene, camera);
      stateRef.current.animFrameId = requestAnimationFrame(renderLoop);
    }

    stateRef.current.animFrameId = requestAnimationFrame(renderLoop);

    // ── 8. Resize Observer ──
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }
      if (stateRef.current.driveTimeline) {
        stateRef.current.driveTimeline.kill();
      }
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── 9. Drive Animation on Mode Change ──
  useEffect(() => {
    const state = stateRef.current;
    if (!state.tractor) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (state.prevMode !== mode) {
      const isLoginToSignup = mode === 'signup'; // Driving Left to Right
      state.prevMode = mode;

      if (prefersReducedMotion) {
        const destX = isLoginToSignup ? 3.6 : -3.6;
        state.tractor.group.position.x = destX;
        state.tractor.group.rotation.y = isLoginToSignup ? -Math.PI / 2 : Math.PI / 2;
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }

      // Cancel previous timeline if running
      if (state.driveTimeline) {
        state.driveTimeline.kill();
      }

      state.isDriving = true;
      state.direction = isLoginToSignup ? 1 : -1;

      // Positions along farm road
      const startX = isLoginToSignup ? -3.6 : 3.6;
      const endX = isLoginToSignup ? 3.6 : -3.6;

      // Facing orientation:
      // Left-to-Right (+X): rotation.y = Math.PI / 2 (facing right)
      // Right-to-Left (-X): rotation.y = -Math.PI / 2 (facing left)
      const drivingHeading = isLoginToSignup ? Math.PI / 2 : -Math.PI / 2;
      // After arriving, tractor turns slightly towards camera for parking idle
      const parkedHeading = isLoginToSignup ? -Math.PI / 2 : Math.PI / 2;

      state.tractor.group.rotation.y = drivingHeading;
      state.tractor.group.position.x = startX;

      const driveTimeline = gsap.timeline({
        onComplete: () => {
          state.isDriving = false;
          state.speed = 0;
          state.tractor.group.rotation.y = parkedHeading;
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });

      state.driveTimeline = driveTimeline;

      // Realistic driving acceleration, travel, and braking
      driveTimeline.to(state.tractor.group.position, {
        x: endX,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const progress = driveTimeline.progress();
          // Bell curve speed: max speed ~13
          state.speed = Math.sin(progress * Math.PI) * 13.0;

          if (onProgressRef.current) {
            onProgressRef.current(progress, isLoginToSignup ? 'forward' : 'backward');
          }
        },
      });

      // Acceleration torque pitch
      driveTimeline.to(
        state.tractor.group.rotation,
        {
          z: isLoginToSignup ? -0.04 : 0.04,
          duration: 0.4,
          ease: 'power1.out',
        },
        0
      );

      // Braking torque pitch
      driveTimeline.to(
        state.tractor.group.rotation,
        {
          z: isLoginToSignup ? 0.04 : -0.04,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        1.15
      );

      // Settle suspension
      driveTimeline.to(
        state.tractor.group.rotation,
        {
          z: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        1.65
      );
    }
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ minHeight: '240px' }}
    />
  );
}
