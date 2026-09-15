import * as THREE from 'three';

/**
 * Creates a detailed, procedural 3D Agricultural Tractor
 * @param {Object} options
 * @param {string|number} options.bodyColor - Primary chassis color (default #048B62)
 * @returns {Object} { group, wheels, exhaustParticles, update(delta, speed, isMoving) }
 */
export function createTractor({ bodyColor = 0x048B62 } = {}) {
  const tractorGroup = new THREE.Group();
  tractorGroup.castShadow = true;
  tractorGroup.receiveShadow = true;

  // Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: bodyColor,
    roughness: 0.35,
    metalness: 0.3,
  });

  const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.6,
  });

  const silverMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.25,
    metalness: 0.85,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1917,
    roughness: 0.95,
    metalness: 0.05,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xfef08a, // Classic warm yellow tractor rims
    roughness: 0.3,
    metalness: 0.4,
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.45,
  });

  const lightGlowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffedd5,
    emissive: 0xfef08a,
    emissiveIntensity: 1.2,
    roughness: 0.2,
  });

  // ── Chassis Frame ──
  const chassisGeo = new THREE.BoxGeometry(1.6, 0.45, 3.4);
  const chassis = new THREE.Mesh(chassisGeo, darkMetalMaterial);
  chassis.position.y = 0.75;
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  tractorGroup.add(chassis);

  // ── Engine Hood (Front) ──
  const hoodGeo = new THREE.BoxGeometry(1.4, 0.9, 1.8);
  const hood = new THREE.Mesh(hoodGeo, bodyMaterial);
  hood.position.set(0, 1.25, 0.75);
  hood.castShadow = true;
  hood.receiveShadow = true;
  tractorGroup.add(hood);

  // Hood top bevel slope
  const hoodNoseGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.4, 16, 1, false, 0, Math.PI);
  const hoodNose = new THREE.Mesh(hoodNoseGeo, bodyMaterial);
  hoodNose.rotation.z = Math.PI / 2;
  hoodNose.rotation.y = Math.PI / 2;
  hoodNose.position.set(0, 1.45, 1.6);
  hoodNose.castShadow = true;
  tractorGroup.add(hoodNose);

  // Front Radiator Grille
  const grilleGeo = new THREE.BoxGeometry(1.2, 0.75, 0.08);
  const grille = new THREE.Mesh(grilleGeo, darkMetalMaterial);
  grille.position.set(0, 1.25, 1.66);
  tractorGroup.add(grille);

  // Grille inner mesh lines
  for (let i = -0.25; i <= 0.25; i += 0.12) {
    const slitGeo = new THREE.BoxGeometry(1.0, 0.04, 0.02);
    const slit = new THREE.Mesh(slitGeo, silverMetalMaterial);
    slit.position.set(0, 1.25 + i, 1.71);
    tractorGroup.add(slit);
  }

  // Front Headlights
  const lightBezelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 16);
  const lightLensGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 16);

  [-0.48, 0.48].forEach((xPos) => {
    const bezel = new THREE.Mesh(lightBezelGeo, silverMetalMaterial);
    bezel.rotation.x = Math.PI / 2;
    bezel.position.set(xPos, 1.45, 1.67);
    tractorGroup.add(bezel);

    const lens = new THREE.Mesh(lightLensGeo, lightGlowMaterial);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(xPos, 1.45, 1.72);
    tractorGroup.add(lens);

    // Forward SpotLight
    const spot = new THREE.SpotLight(0xfff7ed, 2.5, 12, Math.PI / 6, 0.35, 1.5);
    spot.position.set(xPos, 1.45, 1.75);
    spot.target.position.set(xPos * 0.5, 0.2, 8);
    tractorGroup.add(spot);
    tractorGroup.add(spot.target);
  });

  // ── Vertical Exhaust Pipe & Smokestack ──
  const exhaustPipe = new THREE.Group();
  const pipeLowerGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.3, 12);
  const pipeLower = new THREE.Mesh(pipeLowerGeo, darkMetalMaterial);
  pipeLower.position.set(0.55, 1.9, 0.9);
  exhaustPipe.add(pipeLower);

  const pipeCapGeo = new THREE.CylinderGeometry(0.09, 0.06, 0.25, 12);
  const pipeCap = new THREE.Mesh(pipeCapGeo, silverMetalMaterial);
  pipeCap.position.set(0.55, 2.6, 0.9);
  exhaustPipe.add(pipeCap);
  tractorGroup.add(exhaustPipe);

  // ── Exhaust Smoke Particles ──
  const smokeCount = 18;
  const smokeGeo = new THREE.BufferGeometry();
  const smokePos = new Float32Array(smokeCount * 3);
  const smokeSizes = new Float32Array(smokeCount);
  const smokeAlphas = new Float32Array(smokeCount);

  for (let i = 0; i < smokeCount; i++) {
    smokePos[i * 3] = 0.55 + (Math.random() - 0.5) * 0.05;
    smokePos[i * 3 + 1] = 2.65 + i * 0.08;
    smokePos[i * 3 + 2] = 0.9 - i * 0.07;
    smokeSizes[i] = 0.15 + i * 0.03;
    smokeAlphas[i] = 1.0 - i / smokeCount;
  }
  smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3));

  const smokeMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 0.2,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  });
  const smokeParticles = new THREE.Points(smokeGeo, smokeMat);
  tractorGroup.add(smokeParticles);

  // ── Driver Cabin / ROPS Roll-Cage & Seat ──
  // Cabin Floor
  const cabFloorGeo = new THREE.BoxGeometry(1.6, 0.15, 1.4);
  const cabFloor = new THREE.Mesh(cabFloorGeo, darkMetalMaterial);
  cabFloor.position.set(0, 1.0, -0.65);
  tractorGroup.add(cabFloor);

  // Driver Seat
  const seatGeo = new THREE.BoxGeometry(0.7, 0.5, 0.6);
  const seat = new THREE.Mesh(seatGeo, darkMetalMaterial);
  seat.position.set(0, 1.35, -0.7);
  tractorGroup.add(seat);

  const seatBackGeo = new THREE.BoxGeometry(0.7, 0.7, 0.12);
  const seatBack = new THREE.Mesh(seatBackGeo, darkMetalMaterial);
  seatBack.position.set(0, 1.8, -0.96);
  tractorGroup.add(seatBack);

  // Steering Column & Wheel
  const steerColumnGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8);
  const steerColumn = new THREE.Mesh(steerColumnGeo, darkMetalMaterial);
  steerColumn.rotation.x = -Math.PI / 4;
  steerColumn.position.set(0, 1.45, -0.15);
  tractorGroup.add(steerColumn);

  const steerWheelGeo = new THREE.TorusGeometry(0.22, 0.035, 8, 16);
  const steerWheel = new THREE.Mesh(steerWheelGeo, silverMetalMaterial);
  steerWheel.rotation.x = -Math.PI / 4;
  steerWheel.position.set(0, 1.7, -0.38);
  tractorGroup.add(steerWheel);

  // ROPS Safety Roll Bar
  const ropsPillarGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 8);
  [-0.75, 0.75].forEach((xPos) => {
    // Front pillars
    const fPillar = new THREE.Mesh(ropsPillarGeo, bodyMaterial);
    fPillar.position.set(xPos, 1.9, 0.0);
    tractorGroup.add(fPillar);

    // Rear pillars
    const rPillar = new THREE.Mesh(ropsPillarGeo, bodyMaterial);
    rPillar.position.set(xPos, 1.9, -1.25);
    tractorGroup.add(rPillar);
  });

  // Canopy Roof
  const roofGeo = new THREE.BoxGeometry(1.7, 0.1, 1.55);
  const roof = new THREE.Mesh(roofGeo, bodyMaterial);
  roof.position.set(0, 2.75, -0.6);
  roof.castShadow = true;
  tractorGroup.add(roof);

  // Curved Rear Fenders (Mudguards) over big wheels
  [-0.95, 0.95].forEach((xPos) => {
    const fenderGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.5, 16, 1, true, 0, Math.PI);
    const fender = new THREE.Mesh(fenderGeo, bodyMaterial);
    fender.rotation.z = Math.PI / 2;
    fender.position.set(xPos, 1.05, -0.85);
    fender.castShadow = true;
    tractorGroup.add(fender);
  });

  // ── WHEELS WITH DETAILED TREADS & RIMS ──
  const wheels = [];

  // Helper to create wheel
  function buildWheel(radius, width, isRear = false) {
    const wheelGroup = new THREE.Group();
    const spinGroup = new THREE.Group();

    // Tire outer cylinder
    const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 24);
    const tire = new THREE.Mesh(tireGeo, tireMaterial);
    tire.castShadow = true;
    tire.receiveShadow = true;
    spinGroup.add(tire);

    // Deep Agricultural Treads for Rear Tires
    if (isRear) {
      const treadCount = 18;
      for (let t = 0; t < treadCount; t++) {
        const angle = (t / treadCount) * Math.PI * 2;
        const treadGeo = new THREE.BoxGeometry(0.12, width * 0.92, 0.14);
        const tread = new THREE.Mesh(treadGeo, tireMaterial);
        tread.position.set(Math.sin(angle) * (radius + 0.04), 0, Math.cos(angle) * (radius + 0.04));
        tread.rotation.y = angle;
        tread.rotation.z = 0.25 * ((t % 2 === 0) ? 1 : -1); // Chevron diagonal tread pattern
        spinGroup.add(tread);
      }
    }

    // Yellow Rim
    const rimGeo = new THREE.CylinderGeometry(radius * 0.65, radius * 0.65, width * 1.02, 16);
    const rim = new THREE.Mesh(rimGeo, rimMaterial);
    spinGroup.add(rim);

    // Center Hub & Bolts
    const hubGeo = new THREE.CylinderGeometry(radius * 0.25, radius * 0.25, width * 1.1, 12);
    const hub = new THREE.Mesh(hubGeo, darkMetalMaterial);
    spinGroup.add(hub);

    wheelGroup.add(spinGroup);
    wheelGroup.rotation.z = Math.PI / 2;
    return { group: wheelGroup, spinGroup };
  }

  // Front Wheels (Smaller: radius 0.52, width 0.36)
  const frontLeft = buildWheel(0.52, 0.36, false);
  frontLeft.group.position.set(0.85, 0.52, 1.15);
  tractorGroup.add(frontLeft.group);
  wheels.push({ spinGroup: frontLeft.spinGroup, radius: 0.52, side: 1 });

  const frontRight = buildWheel(0.52, 0.36, false);
  frontRight.group.position.set(-0.85, 0.52, 1.15);
  tractorGroup.add(frontRight.group);
  wheels.push({ spinGroup: frontRight.spinGroup, radius: 0.52, side: -1 });

  // Rear Wheels (Giant High-Traction Tires: radius 0.95, width 0.6)
  const rearLeft = buildWheel(0.95, 0.58, true);
  rearLeft.group.position.set(1.05, 0.95, -0.85);
  tractorGroup.add(rearLeft.group);
  wheels.push({ spinGroup: rearLeft.spinGroup, radius: 0.95, side: 1 });

  const rearRight = buildWheel(0.95, 0.58, true);
  rearRight.group.position.set(-1.05, 0.95, -0.85);
  tractorGroup.add(rearRight.group);
  wheels.push({ spinGroup: rearRight.spinGroup, radius: 0.95, side: -1 });

  // ── Wheel Dust Particles (Billowing behind rear tires) ──
  const dustCount = 40;
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  const dustVelocities = [];

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 1.8;
    dustPositions[i * 3 + 1] = Math.random() * 0.3;
    dustPositions[i * 3 + 2] = -1.2 - Math.random() * 1.5;
    dustVelocities.push({
      vx: (Math.random() - 0.5) * 0.04,
      vy: 0.01 + Math.random() * 0.03,
      vz: -0.05 - Math.random() * 0.08,
      life: Math.random(),
    });
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

  const dustMat = new THREE.PointsMaterial({
    color: 0x854d0e, // Warm brown soil dust
    size: 0.28,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const dustParticles = new THREE.Points(dustGeo, dustMat);
  tractorGroup.add(dustParticles);

  // ── Animation & Physics Update Function ──
  let totalTime = 0;

  function update(delta, speed = 0, isMoving = false, direction = 1) {
    totalTime += delta;

    // 1. Wheel Rotation (proportional to speed and tire radius: omega = v / r)
    wheels.forEach(({ spinGroup, radius }) => {
      spinGroup.rotation.y += (speed * delta / radius);
    });

    // 2. Realistic Suspension & Engine Idle Jitter
    const idleCadence = totalTime * 14;
    const bumpCadence = totalTime * 8;
    const bounceAmp = isMoving ? 0.035 : 0.01;
    const pitchAmp = isMoving ? 0.025 : 0.006;

    chassis.position.y = 0.75 + Math.sin(bumpCadence) * bounceAmp + Math.sin(idleCadence) * 0.005;
    hood.position.y = 1.25 + Math.sin(bumpCadence) * bounceAmp * 1.1;
    tractorGroup.rotation.z = Math.sin(totalTime * 6) * pitchAmp * (isMoving ? 1 : 0.3);
    tractorGroup.rotation.x = Math.cos(totalTime * 7) * 0.015 * (isMoving ? 1 : 0.2);

    // 3. Exhaust Smokestack Puffing
    const smokePositions = smokeParticles.geometry.attributes.position.array;
    for (let i = 0; i < smokeCount; i++) {
      const idx = i * 3;
      smokePositions[idx + 1] += delta * (0.8 + Math.random() * 0.4);
      smokePositions[idx + 2] -= delta * (speed * 0.5 + 0.3);
      smokePositions[idx] += Math.sin(totalTime * 5 + i) * 0.005;

      // Reset cycle
      if (smokePositions[idx + 1] > 3.8) {
        smokePositions[idx] = 0.55 + (Math.random() - 0.5) * 0.06;
        smokePositions[idx + 1] = 2.65;
        smokePositions[idx + 2] = 0.9;
      }
    }
    smokeParticles.geometry.attributes.position.needsUpdate = true;

    // 4. Dust Trails from Rear Wheels
    if (isMoving && Math.abs(speed) > 0.5) {
      dustMat.opacity = THREE.MathUtils.lerp(dustMat.opacity, 0.6, 0.1);
      const dPositions = dustParticles.geometry.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        const vel = dustVelocities[i];
        vel.life += delta * 1.6;

        dPositions[i * 3] += vel.vx;
        dPositions[i * 3 + 1] += vel.vy;
        dPositions[i * 3 + 2] += vel.vz * direction;

        if (vel.life > 1.0) {
          vel.life = 0;
          // Spawn near rear wheel contact patch
          const sideX = (Math.random() > 0.5 ? 1 : -1) * (0.95 + Math.random() * 0.2);
          dPositions[i * 3] = sideX;
          dPositions[i * 3 + 1] = 0.1;
          dPositions[i * 3 + 2] = -0.85;
        }
      }
      dustParticles.geometry.attributes.position.needsUpdate = true;
    } else {
      dustMat.opacity = THREE.MathUtils.lerp(dustMat.opacity, 0.0, 0.1);
    }
  }

  return {
    group: tractorGroup,
    wheels,
    update,
  };
}
