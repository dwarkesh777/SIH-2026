"""
AgriSmart AI - Classes & Disease Remediation Database
Contains multi-crop disease definitions (PlantVillage / PlantDoc / Field benchmark set)
and Cotton disease definitions with organic & chemical treatments and preventive measures.
"""

DISEASE_CLASSES = [
    # Multi-crop standard classes (~15-20 shared classes + healthy)
    "Apple Scab",
    "Apple Black Rot",
    "Apple Healthy",
    "Bell Pepper Bacterial Spot",
    "Bell Pepper Healthy",
    "Corn Common Rust",
    "Corn Grey Leaf Spot",
    "Corn Healthy",
    "Grape Black Rot",
    "Grape Leaf Blight",
    "Grape Healthy",
    "Potato Early Blight",
    "Potato Late Blight",
    "Potato Healthy",
    "Tomato Bacterial Spot",
    "Tomato Early Blight",
    "Tomato Late Blight",
    "Tomato Leaf Mould",
    "Tomato Septoria Leaf Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato Healthy",
    # Cotton specific classes
    "Cotton Aphids",
    "Cotton Army Worm",
    "Cotton Bacterial Blight",
    "Cotton Powdery Mildew",
    "Cotton Target Spot",
    "Cotton Healthy"
]

DISEASE_METADATA = {
    "Apple Scab": {
        "status": "Diseased",
        "crop": "Apple",
        "severity": "Moderate",
        "description": "Fungal infection (Venturia inaequalis) causing olive-green to black velvety spots on leaves and fruit.",
        "treatment": "Apply sulfur-based or captan fungicides at bud break. Remove and destroy fallen infected leaves.",
        "prevention": "Plant scab-resistant cultivars (e.g., Liberty, Enterprise). Prune trees annually for air circulation."
    },
    "Apple Black Rot": {
        "status": "Diseased",
        "crop": "Apple",
        "severity": "High",
        "description": "Caused by Botryosphaeria obtusa, creating circular brown 'frog-eye' leaf spots and cankers on branches.",
        "treatment": "Prune out diseased limbs 6-8 inches below visible cankers. Apply thiophanate-methyl or captan fungicide.",
        "prevention": "Remove dead wood and mummified apples from trees and orchard floor before winter."
    },
    "Apple Healthy": {
        "status": "Healthy",
        "crop": "Apple",
        "severity": "None",
        "description": "Foliage exhibits vigorous green color with no visible fungal lesions or pest infestation.",
        "treatment": "No chemical treatment required. Maintain balanced nutrition.",
        "prevention": "Continue regular pest scouting and routine irrigation."
    },
    "Bell Pepper Bacterial Spot": {
        "status": "Diseased",
        "crop": "Bell Pepper",
        "severity": "High",
        "description": "Xanthomonas campestris bacteria causing small, dark, water-soaked circular lesions on leaves.",
        "treatment": "Apply copper bactericide combined with mancozeb early in the morning.",
        "prevention": "Use certified disease-free seeds. Practice a 2-3 year crop rotation with non-solanaceous crops."
    },
    "Bell Pepper Healthy": {
        "status": "Healthy",
        "crop": "Bell Pepper",
        "severity": "None",
        "description": "Uniform vibrant green leaf canopy, healthy blossom formation, and no spotting.",
        "treatment": "No intervention necessary.",
        "prevention": "Ensure well-drained soil and avoid overhead sprinkler watering."
    },
    "Corn Common Rust": {
        "status": "Diseased",
        "crop": "Corn (Maize)",
        "severity": "Moderate",
        "description": "Puccinia sorghi fungus causing elongated reddish-brown pustules on upper and lower leaf surfaces.",
        "treatment": "Apply triazole or strobilurin fungicides if rust pustules appear before tasseling.",
        "prevention": "Plant resistant corn hybrids. Early planting can help avoid peak spore migration."
    },
    "Corn Grey Leaf Spot": {
        "status": "Diseased",
        "crop": "Corn (Maize)",
        "severity": "High",
        "description": "Cercospora zeae-maydis fungus causing rectangular, tan-to-grey lesions bounded by leaf veins.",
        "treatment": "Foliar fungicides such as azoxystrobin + propiconazole applied at VT-R1 growth stages.",
        "prevention": "Perform deep tillage to bury crop residue and rotate crops with legumes or soybeans."
    },
    "Corn Healthy": {
        "status": "Healthy",
        "crop": "Corn (Maize)",
        "severity": "None",
        "description": "Strong green coloration across leaf blades with no chlorosis or pustules.",
        "treatment": "None required.",
        "prevention": "Maintain soil nitrogen levels and monitor weekly."
    },
    "Grape Black Rot": {
        "status": "Diseased",
        "crop": "Grape",
        "severity": "High",
        "description": "Guignardia bidwellii fungus producing tiny black fruiting bodies inside reddish-brown circular leaf spots.",
        "treatment": "Apply myclobutanil or mancozeb fungicide from early shoot growth through bloom.",
        "prevention": "Prune vines to open up the canopy. Destroy mummified berries hanging on vines."
    },
    "Grape Leaf Blight": {
        "status": "Diseased",
        "crop": "Grape",
        "severity": "Moderate",
        "description": "Pseudocercospora vitis causing irregular dark brown necrotic patches on older foliage.",
        "treatment": "Spray copper oxychloride or azoxystrobin upon initial symptom detection.",
        "prevention": "Ensure good trellis airflow and weed control beneath the vine canopy."
    },
    "Grape Healthy": {
        "status": "Healthy",
        "crop": "Grape",
        "severity": "None",
        "description": "Vibrant foliage, robust tendrils, and healthy berry clusters without necrosis.",
        "treatment": "None needed.",
        "prevention": "Standard fungicide protective schedule during rainy periods."
    },
    "Potato Early Blight": {
        "status": "Diseased",
        "crop": "Potato",
        "severity": "Moderate",
        "description": "Alternaria solani fungus creating dark brown spots with concentric target-like rings on mature leaves.",
        "treatment": "Apply chlorothalonil, mancozeb, or difenoconazole spray.",
        "prevention": "Maintain adequate plant nutrition, avoid water stress, and avoid overhead irrigation."
    },
    "Potato Late Blight": {
        "status": "Diseased",
        "crop": "Potato",
        "severity": "Critical",
        "description": "Phytophthora infestans causing rapidly expanding water-soaked black lesions with white mold on leaf undersides.",
        "treatment": "Apply systemic fungicides (metalaxyl/mancozeb or cymoxanil) immediately at first detection.",
        "prevention": "Destroy cull piles, plant certified clean seed tubers, and monitor local blight warning systems."
    },
    "Potato Healthy": {
        "status": "Healthy",
        "crop": "Potato",
        "severity": "None",
        "description": "Clean foliage, uniform leaf margins, and zero necrotic concentric lesions.",
        "treatment": "None required.",
        "prevention": "Ensure hill soil coverage and regular irrigation intervals."
    },
    "Tomato Bacterial Spot": {
        "status": "Diseased",
        "crop": "Tomato",
        "severity": "High",
        "description": "Xanthomonas perforans causing small greasy dark lesions with yellow halos on foliage.",
        "treatment": "Apply copper hydroxide + mancozeb tank mix on a 7-day schedule during wet conditions.",
        "prevention": "Disinfect stakes and trellises. Rotate away from solanaceous crops for 2 years."
    },
    "Tomato Early Blight": {
        "status": "Diseased",
        "crop": "Tomato",
        "severity": "Moderate",
        "description": "Alternaria linariae producing concentric dark rings on lower leaves, leading to yellowing and defoliation.",
        "treatment": "Prune lower infected leaves. Apply copper or chlorothalonil fungicide sprays.",
        "prevention": "Mulch the soil base around plants to prevent soil-splash onto lower foliage."
    },
    "Tomato Late Blight": {
        "status": "Diseased",
        "crop": "Tomato",
        "severity": "Critical",
        "description": "Phytophthora infestans causing dark oily water-soaked patches on leaves and stems during cool damp weather.",
        "treatment": "Emergency application of systemic fungicides like dimethomorph or fluopicolide.",
        "prevention": "Keep foliage dry, maximize spacing, and avoid sprinkler irrigation."
    },
    "Tomato Leaf Mould": {
        "status": "Diseased",
        "crop": "Tomato",
        "severity": "Moderate",
        "description": "Passalora fulva causing pale green or yellowish patches on upper leaf surfaces and velvety olive mold below.",
        "treatment": "Apply bio-fungicides (Bacillus subtilis) or copper-based sprays.",
        "prevention": "Reduce greenhouse/tunnel humidity below 85% with good ventilation."
    },
    "Tomato Septoria Leaf Spot": {
        "status": "Diseased",
        "crop": "Tomato",
        "severity": "Moderate",
        "description": "Septoria lycopersici causing numerous circular spots with dark brown margins and grey centers.",
        "treatment": "Apply chlorothalonil or copper fungicides at the first sign of leaf spotting.",
        "prevention": "Practice strict weed management, remove infected lower leaves, and clean garden tools."
    },
    "Tomato Yellow Leaf Curl Virus": {
        "status": "Diseased",
        "crop": "Tomato",
        "severity": "Critical",
        "description": "TYLCV transmitted by whiteflies (Bemisia tabaci), causing stunted growth, upward leaf cupping, and chlorosis.",
        "treatment": "No cure once infected; immediately rouge and destroy infected plants. Spray insecticidal soap or imidacloprid for whiteflies.",
        "prevention": "Use yellow sticky traps and fine insect netting in nurseries. Grow TYLCV-tolerant hybrid seeds."
    },
    "Tomato Healthy": {
        "status": "Healthy",
        "crop": "Tomato",
        "severity": "None",
        "description": "Vigorous dark green compound leaves, strong stems, and healthy blossom clusters.",
        "treatment": "None needed. Keep balanced calcium-potassium fertilization.",
        "prevention": "Routine scouting and regular drip irrigation."
    },
    # Cotton
    "Cotton Aphids": {
        "status": "Diseased",
        "crop": "Cotton",
        "severity": "Moderate",
        "description": "Aphis gossypii sucking sap from leaves, causing downward curling, yellowing, and sticky honeydew.",
        "treatment": "Apply organic neem oil (10,000 ppm) or systemic insecticides like imidacloprid / acetamiprid.",
        "prevention": "Conserve beneficial predators (ladybird beetles, chrysoperla). Avoid excess nitrogen fertilizers."
    },
    "Cotton Army Worm": {
        "status": "Diseased",
        "crop": "Cotton",
        "severity": "High",
        "description": "Spodoptera frugiperda larvae chewing large irregular holes in leaves and squares, defoliating plants.",
        "treatment": "Apply Bacillus thuringiensis (Bt) spray or chlorantraniliprole 18.5% SC.",
        "prevention": "Install pheromone traps (5 traps/acre) and practice deep summer plowing."
    },
    "Cotton Bacterial Blight": {
        "status": "Diseased",
        "crop": "Cotton",
        "severity": "High",
        "description": "Xanthomonas citri causing angular water-soaked leaf spots turning dark brown (blackarm).",
        "treatment": "Spray streptocycline (100 ppm) + copper oxychloride (0.2%) solution.",
        "prevention": "Use acid-delinted seeds and avoid flood irrigation during hot, humid weather."
    },
    "Cotton Powdery Mildew": {
        "status": "Diseased",
        "crop": "Cotton",
        "severity": "Moderate",
        "description": "Leveillula taurica causing white powdery patches on lower leaf surfaces and premature senescence.",
        "treatment": "Spray wettable sulfur (0.2%) or hexaconazole 5% EC.",
        "prevention": "Ensure adequate plant spacing to allow light penetration and air movement."
    },
    "Cotton Target Spot": {
        "status": "Diseased",
        "crop": "Cotton",
        "severity": "Moderate",
        "description": "Corynespora cassiicola producing circular spots with concentric target-like rings.",
        "treatment": "Apply azoxystrobin or pyraclostrobin fungicides during canopy closure.",
        "prevention": "Rotate crops with non-host crops and manage canopy density."
    },
    "Cotton Healthy": {
        "status": "Healthy",
        "crop": "Cotton",
        "severity": "None",
        "description": "Leaves are vibrant green, turgid, and free of discoloration or pest bites.",
        "treatment": "No treatment required. Maintain balanced nutrition.",
        "prevention": "Routine field scouting and timely irrigation."
    }
}
