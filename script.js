// script.js (Final Optimized Version with Full Database)

// --- 1. Paper Database (25 Papers Hardcoded) ---
// X축: Visual Dependence (0: Geometry ~ 1: Semantic/Vision)
// Y축: Adaptability (0: Offline/Manual ~ 1: Online/Self-supervised)
const papers = {
    // === Core Paper ===
    'wvn': {
        tag: 'CORE', color: 'blue', x: 0.95, y: 0.95,
        title: 'Wild Visual Navigation: Fast Traversability Learning via Pre-Trained Models',
        authors: 'Mattamala et al. (2024)',
        link: 'https://arxiv.org/abs/2404.07110',
        summary: 'DINO 특징과 온라인 자기지도 학습을 결합하여, 라벨링 없이 5분 만에 야생 환경에 적응하는 시스템.',
        method: '<ul class="list-disc pl-4"><li>Vision Backbone: DINOv2 (ViT)</li><li>Self-Supervision: Proprioception (속도 오차)</li></ul>',
        results: '<ul class="list-disc pl-4"><li>높은 풀숲 주행 성공률 100%</li><li>적응 속도: < 5분</li></ul>',
        analysis: {
            new_work: '기하학적 맵 없이 DINO 특징과 고유수용감각만으로 주행 가능성 실시간 학습.',
            importance: '사전 훈련 없이 미지의 야생 환경(숲, 덤불)에 즉각 적응 가능.',
            gap: '기존 기하학은 풀을 벽으로 인식, 기존 딥러닝은 적응에 수십 시간 소요.',
            gap_filled: 'Self-Supervised Learning Loop로 데이터 부족 및 적응 속도 해결.',
            achievement: 'LiDAR가 실패하는 고밀도 식생 환경 돌파.',
            data_used: 'RGB, IMU, Joint Torque.',
            limitations: '시각 정보 의존으로 조명 변화나 웅덩이에 취약할 수 있음.'
        }
    },

    // === Part 1. Geometry (2.1절) ===
    'moravec1985': {
        tag: 'GEOMETRY', color: 'cyan', x: 0.1, y: 0.1,
        title: '[2] High Resolution Maps from Wide Angle Sonar',
        authors: 'Moravec & Elfes (1985)',
        link: 'https://doi.org/10.1109/ROBOT.1985.1087316',
        summary: '소나 센서를 이용해 공간을 비어있음/채워짐 확률로 표현하는 점유 격자 지도(Occupancy Grid Map)를 최초 제안.',
        analysis: {
            new_work: '소나(Sonar) 센서의 거리 데이터를 이용해 로봇 주변의 공간을 "비어있음(Free)" 또는 "채워짐(Occupied)" 확률로 표현하는 점유 격자 지도(Occupancy Grid Map) 개념을 최초로 제안했습니다.',
            importance: '로봇 매핑(Mapping)과 내비게이션 분야의 시초가 되는 연구로, 불확실한 센서 데이터를 확률적으로 통합하여 지도를 만드는 표준을 제시했습니다.',
            gap: '물체의 **형태(Geometry)**만 봅니다. 따라서 부드러운 풀숲이나 덤불도 소나 센서에는 \'장애물(Occupied)\'로 인식되어, 로봇이 지나갈 수 있는 곳임에도 불구하고 가지 못하는 문제가 발생합니다.',
            gap_filled: '여러 위치에서 얻은 소나 센서의 거리 값을 2차원 격자 지도에 누적하여, 장애물이 있을 확률이 높은 곳을 찾아냅니다.',
            achievement: '소나 센서의 넓은 빔(Wide angle)으로 인한 부정확성을 다수의 측정값 융합으로 극복하고, 실내 환경 지도를 성공적으로 작성했습니다.',
            data_used: '폴라로이드 초음파 거리 측정 센서(Polaroid ultrasonic range transducer) 데이터.',
            limitations: '단순한 기하학적 정보만 다루므로, 풀이나 연기처럼 형체는 있지만 통과 가능한 장애물을 구별할 수 없습니다.'
        }
    },
    'cao2022': {
        tag: 'GEOMETRY', color: 'cyan', x: 0.15, y: 0.3,
        title: '[16] Autonomous Exploration Development Environment',
        authors: 'Cao et al. (2022)',
        link: 'https://doi.org/10.1109/ICRA46639.2022.9812330',
        summary: 'DARPA 지하 챌린지에서 입증된 TARE/FAR 플래닝 알고리즘. 복잡한 3D 환경 탐사의 표준 프레임워크.',
        analysis: {
            new_work: '지상 로봇의 자율 탐사를 위한 통합 개발 환경과 **TARE(탐사)/FAR(경로 계획)**라는 고성능 플래닝 알고리즘을 오픈 소스로 공개했습니다.',
            importance: 'DARPA Subterranean Challenge에서 입증된 시스템으로, 복잡한 3D 환경(지하, 동굴 등)에서 빠르고 효율적인 탐사를 가능하게 하는 표준 프레임워크를 제공합니다.',
            gap: 'LiDAR 기반의 포인트 클라우드나 메쉬를 사용하므로, 기하학적으로 튀어나온 물체(예: 높은 풀)를 무조건 장애물로 인식하는 한계가 여전히 존재합니다.',
            gap_filled: '계층적 계획(Hierarchical planning)을 사용하여, 전역적인 탐사 경로와 지역적인 장애물 회피 경로를 효율적으로 생성합니다.',
            achievement: 'DARPA 대회에서 "가장 많은 구역을 탐사한 팀"으로 선정될 만큼 탐사 효율성이 뛰어납니다.',
            data_used: '3D LiDAR, 스테레오 카메라, 관성 측정 장치(IMU) 데이터.',
            limitations: '기하학적 정보에만 의존하므로, 의미론적 정보(이것이 풀인지 돌인지)를 활용한 주행 판단은 수행하지 않습니다.'
        }
    },
    'fan2021': {
        tag: 'GEOMETRY', color: 'cyan', x: 0.2, y: 0.2,
        title: '[17] STEP: Stochastic Traversability Evaluation',
        authors: 'Fan et al. (2021)',
        link: 'https://doi.org/10.15607/RSS.2021.XVII.021',
        summary: '센서 노이즈와 위치 오차를 고려해 CVaR로 최악의 위험(절벽 등)을 회피하는 확률적 계획법.',
        analysis: {
            new_work: '센서 노이즈와 위치 추정 오차를 고려한 불확실성 인지(Uncertainty-aware) 주행 가능성 평가 방법을 제안하고, **CVaR(Conditional Value-at-Risk)**를 이용해 꼬리 위험(Tail risk)을 관리하는 계획법을 제시했습니다.',
            importance: '단순히 평균적인 위험을 피하는 것이 아니라, 최악의 상황(예: 절벽 추락)을 고려하여 안전성을 획기적으로 높였습니다.',
            gap: '여전히 **지형의 기하학적 특징(기울기, 거칠기)**에 기반하여 위험을 판단합니다. 따라서 부드러운 풀숲이 거칠게 보이면 위험하다고 판단하여 회피하는 보수적인 성향을 보입니다.',
            gap_filled: '2.5D 높이 맵의 불확실성을 모델링하고, 이를 기반으로 확률적 모델 예측 제어(MPC)를 수행하여 위험을 최소화하는 경로를 생성합니다.',
            achievement: '용암 동굴, 폐광 등 극한의 비정형 환경에서 바퀴형 및 보행 로봇의 자율 주행을 성공시켰습니다.',
            data_used: 'Velodyne VLP-16 LiDAR 데이터 및 로봇 위치 정보.',
            limitations: '기하학적 정보만으로는 "형상은 위험해 보이지만 실제로는 안전한(예: 풀숲)" 지형을 구분하지 못합니다.'
        }
    },
    'chavez2018': {
        tag: 'GEOMETRY', color: 'cyan', x: 0.25, y: 0.4,
        title: '[18] Learning Ground Traversability from Simulations',
        authors: 'Chavez-Garcia et al. (2018)',
        link: 'https://doi.org/10.1109/LRA.2018.2801794',
        summary: '실제 로봇 대신 시뮬레이션에서 수많은 시나리오를 돌려 높이 맵의 주행 가능성을 학습.',
        analysis: {
            new_work: '실제 로봇을 위험하게 굴리는 대신, 시뮬레이션에서 로봇이 지형을 통과하는 수많은 시나리오를 돌려보고, 이를 통해 높이 맵(Heightmap)의 주행 가능성을 학습하는 방법을 제안했습니다.',
            importance: '로봇마다(바퀴, 궤도, 보행) 지형을 통과하는 능력이 다르다는 점에 착안하여, 플랫폼별 맞춤형 주행 가능성을 데이터 기반으로 학습했습니다.',
            gap: '시뮬레이션 데이터에 의존하므로, 시뮬레이션에서 모델링하기 힘든 복잡한 자연물(식물, 진흙 등)에 대한 대응력이 떨어집니다.',
            gap_filled: '절차적으로 생성된 다양한 지형(Procedural terrain generation) 위에서 로봇 시뮬레이션을 수행하고, 그 결과를 CNN에 학습시켜 높이 맵 패치의 주행 여부를 분류합니다.',
            achievement: '사람이 일일이 규칙을 정해주지 않아도, 복잡한 지형의 주행 가능성을 꽤 정확하게 예측했습니다.',
            data_used: '가상 환경에서 생성된 높이 맵(Heightmap)과 로봇 주행 결과 데이터.',
            limitations: '여전히 기하학적 정보(높이 맵)만 입력으로 사용하므로 비강체(Non-rigid) 장애물을 구별하지 못합니다.'
        }
    },
    'yang2021': {
        tag: 'GEOMETRY', color: 'cyan', x: 0.3, y: 0.45,
        title: '[19] Real-time Optimal Navigation Using Learned Motion Costs',
        authors: 'Yang et al. (2021)',
        link: 'https://doi.org/10.1109/ICRA48506.2021.9561861',
        summary: '4족 보행 로봇(ANYmal)을 위해 지형에 따른 에너지, 위험도를 예측하고 GPU로 가속하여 경로 계획.',
        analysis: {
            new_work: 'Chavez-Garcia(2018)의 아이디어를 **4족 보행 로봇(ANYmal)**으로 확장하여, 지형에 따른 에너지 소모, 시간, 위험도를 예측하는 신경망을 개발하고 이를 GPU 가속 계획기에 통합했습니다.',
            importance: '단순히 갈 수 있다/없다가 아니라, "얼마나 힘들게 가는가(Cost)"를 정량화하여 최적의 경로를 찾을 수 있게 했습니다.',
            gap: '높이 맵(Elevation map)을 입력으로 사용하므로, 풀숲이나 덤불 같은 비강체 장애물에 대한 정보가 부족합니다.',
            gap_filled: '시뮬레이션에서 수집한 데이터로 신경망을 학습시키고, 이를 기반으로 GPU 상에서 수천 개의 경로 후보를 병렬로 평가하는 샘플링 기반 계획기를 사용합니다.',
            achievement: '기존 RRT* 알고리즘보다 1000배 빠른 속도로 최적 경로를 생성하며, 복잡한 계단이나 거친 지형을 실시간으로 극복했습니다.',
            data_used: '시뮬레이션 및 실제 환경의 높이 맵 데이터.',
            limitations: '기하학적 정보에만 의존하여 풀숲을 벽으로 인식하는 한계를 그대로 가집니다.'
        }
    },
    'frey2022': {
        tag: 'GEOMETRY', color: 'cyan', x: 0.2, y: 0.5,
        title: '[20] Locomotion Policy Guided Traversability Learning',
        authors: 'Frey et al. (2022)',
        link: 'https://doi.org/10.1109/IROS47612.2022.9982190',
        summary: '2.5D 맵 대신 3D 복셀 맵을 사용하여 동굴이나 오버행 같은 복잡한 3D 구조의 주행 가능성 학습.',
        analysis: {
            new_work: '기존의 2.5D 높이 맵 대신 3D 복셀(Voxel) 점유 맵을 사용하여, 오버행(Overhang)이나 터널 같은 복잡한 3D 구조의 주행 가능성을 학습했습니다.',
            importance: '단순한 지상 주행을 넘어, 동굴이나 건물 내부처럼 천장이 있거나 구조가 복잡한 환경에서도 로봇의 주행 가능성을 정확히 판단할 수 있습니다.',
            gap: '3D 구조를 잘 파악하지만, 여전히 "꽉 찬 복셀(Occupied Voxel)"이 딱딱한 돌인지 부드러운 풀인지는 구별하지 못합니다.',
            gap_filled: '희소 3D CNN(Sparse 3D CNN)을 사용하여 계산 효율성을 높이고, 대규모 시뮬레이션을 통해 로봇의 정책(Policy)에 특화된 주행 비용을 학습합니다.',
            achievement: '57년 분량의 주행 데이터를 시뮬레이션으로 수집하여 학습했으며, 숲과 동굴 같은 복잡한 환경에서 경로 계획 성능을 입증했습니다.',
            data_used: '시뮬레이션에서 수집한 3D 점유 맵과 주행 성공률 데이터.',
            limitations: '시각 정보(Visual features)를 사용하지 않아 의미론적 구분이 불가능합니다.'
        }
    },

    // === Part 2. Semantics (2.2절) ===
    'maturana2017': {
        tag: 'SEMANTICS', color: 'purple', x: 0.7, y: 0.3,
        title: '[4] Real-time Semantic Mapping for Off-Road',
        authors: 'Maturana et al. (2017)',
        link: 'https://doi.org/10.1007/978-3-319-67361-5_22',
        summary: 'LiDAR 맵에 이미지의 시맨틱 정보(풀, 바위, 도로)를 투영하여 의미론적 2.5D 맵 생성.',
        analysis: {
            new_work: '2.5D 그리드 맵(elevation map)에 의미론적 정보(Semantic information)를 융합하는 방법을 제안했습니다.',
            importance: '오프로드 환경에서는 기하학적 정보(장애물 유무)만으로는 부족합니다. 풀은 밟고 지나갈 수 있지만 단단한 바위는 피해야 합니다.',
            gap: '이 방식은 미리 정의된 클래스(풀, 흙, 나무 등)에 의존합니다. 학습 데이터에 없는 새로운 환경이나 물체가 나타나면 제대로 인식하지 못합니다.',
            gap_filled: '신경망(CNN)을 사용하여 이미지에서 의미론적 분할(Segmentation)을 수행하고, 이를 LiDAR로 만든 2.5D 높이 지도와 결합합니다.',
            achievement: '오프로드 환경에서 단순 장애물 회피를 넘어, 선호하는 지형(예: 도로)을 따라가고 위험한 지형을 피하는 내비게이션을 실시간으로 구현했습니다.',
            data_used: 'Yamaha Viking (ATV) 차량에 장착된 LiDAR와 카메라 데이터. (Cityscapes 전이 학습)',
            limitations: '사전 학습된 의미론적 클래스에 의존하므로, 낯선 환경(Wild)에서 새로운 지형을 만나면 적응하기 어렵습니다.'
        }
    },
    'schilling2017': {
        tag: 'SEMANTICS', color: 'purple', x: 0.75, y: 0.35,
        title: '[22] Geometric and Visual Terrain Classification',
        authors: 'Schilling et al. (2017)',
        link: 'https://doi.org/10.1109/IROS.2017.8206092',
        summary: '도심 데이터(Cityscapes)로 학습된 모델을 오프로드에 전이 학습하여 기하학+시각 정보 융합.',
        analysis: {
            new_work: '도심 환경 데이터셋(Cityscapes)으로 학습된 모델을 **전이 학습(Transfer Learning)**하여 오프로드 환경에 적용하고, 기하학적 정보와 시각적 정보를 융합했습니다.',
            importance: '오프로드 데이터가 부족한 문제를 해결하기 위해 도심 데이터셋을 활용하는 방법을 제시했습니다.',
            gap: '여전히 사전에 정의된 클래스(Semantic labels)를 사용하며, 분류기가 새로운 환경에 적응하기 위해서는 추가적인 미세 조정(Fine-tuning)이 필요합니다.',
            gap_filled: 'FCN으로 시각적 라벨을 얻고, 이를 LiDAR의 기하학적 특징과 결합하여 랜덤 포레스트로 최종 주행 가능성을 판단합니다.',
            achievement: '눈 덮인 환경 등 새로운 환경에서도 강인한 분류 성능을 보여주었습니다.',
            data_used: 'Cityscapes 데이터셋(학습용) 및 자체 수집한 오프로드 주행 데이터(테스트용).',
            limitations: '사전 학습된 도메인(도심)과 실제 환경의 차이가 클 경우 성능이 저하될 수 있습니다.'
        }
    },
    'belter2019': {
        tag: 'SEMANTICS', color: 'purple', x: 0.8, y: 0.4,
        title: '[23] Employing Natural Terrain Semantics',
        authors: 'Belter et al. (2019)',
        link: 'https://doi.org/10.1007/S10846-018-0865-X',
        summary: '3D OctoMap에 시맨틱 라벨을 입혀 로봇이 선호하는 지형(예: 아스팔트)을 따라 걷도록 유도.',
        analysis: {
            new_work: 'RGB-D 데이터를 이용해 3D **OctoMap(복셀 맵)**에 의미론적 라벨(풀, 아스팔트 등)을 입히고, 이를 A* 및 RRT 계획기에 통합했습니다.',
            importance: '단순히 장애물을 피하는 것을 넘어, 로봇이 "선호하는 지형(예: 아스팔트)"을 따라 걷도록 유도하는 계획법을 구현했습니다.',
            gap: '특정 지형 클래스(잔디, 아스팔트 등)에 대한 선호도를 사람이 미리 설정해야 하며, 분류기의 성능에 크게 의존합니다.',
            gap_filled: 'SVM이나 랜덤 트리를 이용해 지형을 분류하고, 각 지형 타입에 가중치(Cost)를 부여하여 경로 탐색 시 비용 함수로 사용합니다.',
            achievement: '로봇이 잔디밭 대신 보도블록을 선택하여 걷는 등 사람과 유사한 지형 선호도를 반영한 주행을 시연했습니다.',
            data_used: 'Kinect v2 센서의 RGB-D 데이터.',
            limitations: '새로운 환경에서 새로운 지형 타입이 나타나면 인식하지 못합니다.'
        }
    },
    'shaban2022': {
        tag: 'SEMANTICS', color: 'purple', x: 0.85, y: 0.5,
        title: '[24] Semantic Terrain Classification (BEVNet)',
        authors: 'Shaban et al. (2022)',
        link: 'https://proceedings.mlr.press/v164/shaban22a.html',
        summary: '희소한 LiDAR 데이터를 입력받아 조감도(BEV) 시점의 꽉 찬 주행 비용 맵을 예측하는 신경망.',
        analysis: {
            new_work: 'BEVNet이라는 신경망을 제안하여, 희소한(Sparse) LiDAR 데이터를 입력받아 조감도(Bird\'s Eye View) 시점의 밀집된(Dense) 주행 비용 맵을 직접 예측합니다.',
            importance: '지형의 의미론적 정보와 기하학적 정보를 동시에 고려하며, LiDAR 데이터가 없는 영역까지 예측(Inpainting)하여 완전한 지도를 만듭니다.',
            gap: '여전히 학습을 위해 의미론적 라벨이 달린 대규모 데이터셋(SemanticKITTI, RELLIS-3D)이 필요하며, 정의된 클래스 비용 체계를 따릅니다.',
            gap_filled: '시간적 정보를 통합하는 순환 신경망(RNN) 구조를 사용하여 맵의 안정성을 높이고, 오버행 장애물을 필터링하는 기능을 포함했습니다.',
            achievement: 'SemanticKITTI 및 RELLIS-3D 벤치마크에서 기존 방법들을 능가하는 성능을 보였습니다.',
            data_used: 'SemanticKITTI, RELLIS-3D 데이터셋 (LiDAR 포인트 클라우드).',
            limitations: '사전에 정의되지 않은 새로운 지형이나 장애물에 대한 적응력이 부족할 수 있습니다.'
        }
    },
    'cai2022': {
        tag: 'SEMANTICS', color: 'purple', x: 0.8, y: 0.55,
        title: '[25] Risk-Aware Navigation via Learned Speed Map',
        authors: 'Cai et al. (2022)',
        link: 'https://doi.org/10.1109/IROS47612.2022.9982200',
        summary: '주행 가능성을 비용이 아닌 "해당 지형에서 낼 수 있는 속도 분포"로 정의하여 학습.',
        analysis: {
            new_work: '주행 가능성을 단순한 비용이 아니라, **"해당 지형에서 로봇이 낼 수 있는 속도 분포"**로 정의하고 이를 학습했습니다.',
            importance: '지형의 의미론적 정보(풀, 흙)와 로봇의 명령 속도에 따라 **실제 속도가 얼마나 줄어들지(위험도)**를 예측하여, 더 안전하고 빠른 경로를 계획합니다.',
            gap: '의미론적 정보를 입력으로 사용하므로, 의미론적 분할(Segmentation)의 정확도에 의존하며, 데이터셋의 클래스 분류가 거칠 경우 세밀한 주행 판단이 어렵습니다.',
            gap_filled: '주행 경험 데이터를 통해 지형별 속도 분포를 학습하고, CVaR을 이용해 위험을 회피하는 비용 맵을 생성합니다.',
            achievement: '기존 방법 대비 목표 도달 시간을 단축하고, 내비게이션 성공률을 30% 향상시켰습니다.',
            data_used: 'Unity 시뮬레이션 및 실제 로봇 주행 데이터 (이미지, 속도).',
            limitations: '입력으로 사용되는 시맨틱 정보의 품질에 성능이 좌우됩니다.'
        }
    },
    'bradley2015': {
        tag: 'SEMANTICS', color: 'purple', x: 0.65, y: 0.25,
        title: '[21] Scene Understanding for Walking Robot',
        authors: 'Bradley et al. (2015)',
        link: 'https://doi.org/10.1109/IROS.2015.7353514',
        summary: '식생과 장애물을 구분하고 지면의 실제 높이를 추정하여 밟아도 되는 풀인지 판단.',
        analysis: {
            new_work: '보행 로봇을 위해 시각 정보(이미지)와 LiDAR 데이터를 융합하여 식생(Vegetation)과 단단한 장애물을 구분하고, **지면의 실제 높이**를 추정하는 시스템을 제안했습니다.',
            importance: '풀숲에 가려진 실제 땅의 높이를 추정함으로써, 로봇이 풀을 밟아도 되는지, 아니면 그 아래 구덩이가 있는지 판단할 수 있게 했습니다.',
            gap: '미리 정의된 클래스(풀, 덤불 등)에 의존하며, 학습 데이터 수집과 라벨링에 많은 비용이 듭니다.',
            gap_filled: '수동으로 라벨링된 대규모 데이터셋을 사용하여 랜덤 포레스트(Random Forest) 같은 분류기를 학습시킵니다.',
            achievement: '다양한 계절과 환경에서 수집된 298km 분량의 데이터셋을 통해 시스템의 견고함을 입증했습니다.',
            data_used: 'RGB 및 근적외선(NIR) 카메라, LiDAR, 스테레오 카메라 데이터.',
            limitations: '고정된 클래스 라벨(Label)에 묶여 있어 유연성이 떨어집니다.'
        }
    },

    // === Part 3. Self-Supervision (2.3절) ===
    'kim2006': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.4, y: 0.65,
        title: '[8] Traversability Classification using Unsupervised On-line Visual Learning',
        authors: 'Kim et al. (2006)',
        link: 'https://doi.org/10.1109/ROBOT.2006.1641763',
        summary: '범퍼 충돌이나 바퀴 슬립을 레이블로 사용하여 시각 분류기를 실시간 온라인 학습.',
        analysis: {
            new_work: '온라인 자기 지도 학습(Online Self-supervised Learning) 개념을 야외 로봇 주행에 도입했습니다. 범퍼 충돌이나 바퀴 슬립을 비주행 영역 레이블로 활용합니다.',
            importance: '사람의 개입 없이 로봇이 미지의 환경에서 스스로 학습하며 적응할 수 있는 가능성을 보여준 선구적인 연구입니다.',
            gap: '당시 기술적 한계로 단순한 시각적 특징(색상 히스토그램 등)만 사용했기에 복잡한 환경 변화나 의미론적 구분에는 한계가 있었습니다.',
            gap_filled: '스테레오 카메라로 얻은 거리 정보와 색상 정보를 클러스터링하여 주행 가능성을 판단하는 모델을 지속적으로 업데이트했습니다.',
            achievement: '사전 지식 없이도 장애물을 피하며 목적지에 도달하는 자율 주행을 시연했습니다.',
            data_used: 'LAGR 로봇 플랫폼을 이용한 야외 주행 데이터.',
            limitations: '단순한 특징 추출 방식으로 인해 조명 변화나 그림자에 취약했습니다.'
        }
    },
    'bajracharya2009': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.45, y: 0.7,
        title: '[26] Autonomous off-road navigation (LAGR)',
        authors: 'Bajracharya et al. (2009)',
        link: 'https://doi.org/10.1002/ROB.20269',
        summary: '근거리의 확실한 정보를 정답으로 삼아 원거리 지형을 학습 (Near-to-Far).',
        analysis: {
            new_work: '근거리(Near-field) 학습을 원거리(Far-field)로 확장하는 시스템을 구축했습니다. 가까운 곳은 스테레오 비전으로 확실하게 분류하고, 이를 정답지로 삼습니다.',
            importance: '로봇이 근시안적인(Myopic) 주행을 하지 않고 멀리 있는 장애물을 미리 피할 수 있게 하여 주행 속도와 효율성을 높였습니다.',
            gap: '기하학적 정보(장애물 높이)에 의존하여 라벨을 생성하므로, 기하학적으로는 장애물처럼 보이는 높은 풀 등을 주행 불가능으로 잘못 판단할 수 있습니다.',
            gap_filled: '근거리의 기하학적 분류 결과를 이용해 원거리 이미지의 색상 히스토그램 모델을 학습시켰습니다.',
            achievement: 'DARPA LAGR 프로그램에서 우수한 성과를 거두며, 다양한 지형에서의 적응력을 입증했습니다.',
            data_used: 'LAGR 로봇 플랫폼 데이터.',
            limitations: '학습된 모델의 표현력이 낮아 복잡한 자연 환경의 세밀한 구분은 어려웠습니다.'
        }
    },
    'wellhausen2019': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.5, y: 0.6,
        title: '[6] Where Should I Walk? Predicting Terrain Properties',
        authors: 'Wellhausen et al. (2019)',
        link: 'https://doi.org/10.1109/LRA.2019.2895390',
        summary: '로봇 발바닥 센서로 지면 물성을 측정하고 이를 이미지에 투영하여 학습 (Proprioception).',
        analysis: {
            new_work: '4족 보행 로봇의 발바닥 힘/토크 센서를 이용해 지면의 물리적 특성(마찰력, 단단함)을 측정하고, 이를 카메라 이미지에 투영하여 학습했습니다.',
            importance: '단순히 "갈 수 있다/없다"를 넘어 지면의 물리적 속성을 예측함으로써 로봇이 더 안전하고 효율적인 발자국을 선택할 수 있게 했습니다.',
            gap: '발자국 데이터는 매우 희소(Sparse)하여 이미지 전체를 학습하기 어렵고, 오프라인 학습 방식이라 현장에서 즉각적인 적응이 불가능했습니다.',
            gap_filled: '로봇의 발이 닿은 위치의 이미지 패치를 추출하고, 해당 위치의 물리적 속성을 라벨로 하여 CNN(ResNet 등)을 학습시켰습니다.',
            achievement: '시각 정보만으로 지면의 물리적 특성을 예측하는 데 성공했습니다.',
            data_used: 'ANYmal 로봇으로 수집한 데이터.',
            limitations: '실시간 온라인 학습이 아니어서 새로운 환경에 적응하려면 데이터 수집 후 재학습 과정이 필요했습니다.'
        }
    },
    'zurn2021': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.55, y: 0.55,
        title: '[27] Visual Terrain Classification from Audio',
        authors: 'Zürn et al. (2021)',
        link: 'https://doi.org/10.1109/TRO.2020.3031214',
        summary: '주행 소리(Audio)를 이용해 지형을 군집화하고 이를 시각적 학습의 정답지로 사용.',
        analysis: {
            new_work: '로봇이 주행할 때 발생하는 **소리(Audio)**를 이용하여 지형을 군집화(Clustering)하고, 이를 시각적 특징 학습의 정답지로 사용했습니다.',
            importance: '시각 정보 외에 청각 정보라는 새로운 모달리티를 활용하여, 눈으로 구별하기 힘든 지형의 특성을 파악했습니다.',
            gap: '소리를 듣기 위해서는 로봇이 이미 해당 지형을 밟고 지나가야 하므로, 사전 예측이나 회피에는 한계가 있습니다.',
            gap_filled: '주행 소음을 딥러닝으로 임베딩하여 클러스터링하고, 이를 같은 위치의 이미지 패치에 라벨로 부여하여 시맨틱 세그멘테이션 네트워크를 학습시켰습니다.',
            achievement: '다양한 도시 환경(아스팔트, 자갈, 풀 등)을 소리와 시각 정보의 융합으로 정확하게 분류했습니다.',
            data_used: 'Freiburg Terrains 데이터셋 (오디오, 비디오, 포즈).',
            limitations: '환경 소음에 취약합니다.'
        }
    },
    'gasparino2022': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.6, y: 0.75,
        title: '[7] WayFAST: Navigation With Predictive Traversability',
        authors: 'Gasparino et al. (2022)',
        link: 'https://doi.org/10.1109/LRA.2022.3193464',
        summary: '바퀴 로봇의 견인력(Traction)을 추정하여 미끄러운 지형(눈, 모래)을 예측 및 회피.',
        analysis: {
            new_work: '로봇의 견인력(Traction) 추정치를 주행 가능성 지표로 사용했습니다. MPC의 예상 경로와 실제 경로의 차이를 통해 미끄러짐을 감지합니다.',
            importance: '기하학적 장애물뿐만 아니라 모래나 눈처럼 미끄러운 지형을 효과적으로 식별하고 회피할 수 있습니다.',
            gap: '오프라인 학습 방식을 사용하여, 학습 데이터에 없는 완전히 새로운 환경에서는 성능이 떨어질 수 있습니다.',
            gap_filled: 'RGB-D 이미지와 로봇의 운동학적 모델을 결합한 CNN(TravNet)을 학습시켜 주행 가능성을 예측하고, 이를 MPPI 제어기에 통합했습니다.',
            achievement: '눈 덮인 들판이나 모래사장 등 기존 센서로는 구분이 어려운 환경에서 우수한 내비게이션 성능을 보였습니다.',
            data_used: 'Husky(로봇), Polaris RZR(ATV) 데이터.',
            limitations: '바퀴형 로봇에 초점이 맞추어져 있어 다족 로봇의 특성을 반영하기 어렵습니다.'
        }
    },
    'kahn2021': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.8, y: 0.8,
        title: '[28] BADGR: End-to-End Self-Supervised Navigation',
        authors: 'Kahn et al. (2021)',
        link: 'https://doi.org/10.1109/LRA.2021.3057023',
        summary: '원시 이미지에서 충돌 및 흔들림을 직접 예측하는 End-to-End 시스템.',
        analysis: {
            new_work: '원시 센서 데이터(이미지)에서 직접 미래의 사건(충돌, 흔들림)을 예측하는 End-to-End 강화학습/자기 지도 학습 시스템을 구축했습니다.',
            importance: '사람의 개입이나 시뮬레이션 없이 실제 환경에서의 경험만으로 내비게이션 정책을 학습할 수 있음을 보여주었습니다.',
            gap: '온라인 학습으로 프레임되지는 않았으며(데이터 수집 후 학습), 대량의 데이터(72시간 주행)가 필요하여 새로운 환경에 빠르게 적응하기에는 무리가 있습니다.',
            gap_filled: '과거의 이미지와 행동 시퀀스를 입력으로 받아 미래의 충돌 확률이나 위치를 예측하는 신경망을 학습시키고, 이를 이용해 최적의 행동을 선택합니다.',
            achievement: '높은 풀숲을 장애물이 아닌 통과 가능한 지역으로 인식하고, 울퉁불퉁한 길을 피하는 등의 행동을 스스로 학습했습니다.',
            data_used: 'Clearpath Jackal 로봇으로 수집한 42시간 분량의 데이터.',
            limitations: '학습에 많은 데이터와 시간이 필요하며, 계산 비용이 높습니다.'
        }
    },
    'sathyamoorthy2022': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.75, y: 0.85,
        title: '[29] TerraPN: Unstructured Terrain Navigation',
        authors: 'Sathyamoorthy et al. (2022)',
        link: 'https://doi.org/10.1109/IROS47612.2022.9981942',
        summary: 'WVN과 유사한 온라인 학습 시스템. RGB와 속도를 입력받아 진동을 예측.',
        analysis: {
            new_work: 'RGB 이미지와 로봇의 속도를 입력으로 받아, IMU 진동 및 오도메트리 오차를 예측하는 네트워크를 온라인으로 학습했습니다.',
            importance: 'WVN과 유사하게 현장에서 데이터를 수집하고 학습하는 온라인 시스템을 구현했습니다.',
            gap: '학습에 약 25분이 소요되어 WVN(5분 미만)에 비해 느립니다.',
            gap_filled: '이미지 패치를 비균일하게 샘플링하여 효율성을 높이고, 예측된 비용 맵을 DWA 기반 내비게이션에 통합했습니다.',
            achievement: '다양한 야외 환경에서 기존 방법 대비 진동을 줄이고 성공률을 높였습니다.',
            data_used: 'Clearpath Husky 로봇 데이터.',
            limitations: 'WVN보다 학습 및 적응 속도가 느립니다.'
        }
    },
    'guaman2023': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.7, y: 0.8,
        title: '[30] How Does It Feel? Self-Supervised Costmap',
        authors: 'Guaman Castro et al. (2023)',
        link: 'https://doi.org/10.1109/ICRA48891.2023.10160856',
        summary: '시각 정보와 속도를 결합해 연속적인 주행 비용 예측. 속도를 푸리에 특징으로 변환.',
        analysis: {
            new_work: '시각적 정보와 로봇의 속도를 결합하여 연속적인(Continuous) 주행 비용을 예측하는 방법을 제안했습니다. 속도 정보를 푸리에 특징으로 변환했습니다.',
            importance: '단순한 이진 분류(갈 수 있다/없다)가 아니라, "이 속도로 가면 얼마나 흔들릴까?"를 예측하여 더 정교한 주행이 가능합니다.',
            gap: '여전히 많은 양의 데이터 수집이 필요하며, 실시간 온라인 적응보다는 사전 학습된 모델의 활용에 중점을 둡니다.',
            gap_filled: 'IMU 데이터를 기반으로 \'가상의 정답(Pseudo-ground truth)\'을 생성하고, 이를 시각 정보와 매핑하는 신경망을 학습시킵니다.',
            achievement: '대형 ATV와 로봇 플랫폼 모두에서 부드러운 주행을 달성했습니다.',
            data_used: 'TartanDrive 데이터셋, ATV 및 Warthog 로봇 데이터.',
            limitations: '새로운 환경에 대한 즉각적인 적응성(Few-shot adaptation)은 WVN보다 부족할 수 있습니다.'
        }
    },
    'jung2024': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.9, y: 0.75,
        title: '[31] V-STRONG: Visual Self-Supervised Traversability',
        authors: 'Jung et al. (2024)',
        link: 'https://arxiv.org/abs/2312.16016',
        summary: '초거대 비전 모델(SAM)을 활용해 로봇 궤적과 마스크를 결합하여 학습 성능 극대화.',
        analysis: {
            new_work: '**비전 파운데이션 모델(SAM, Segment Anything Model)**을 활용하여 자기 지도 학습의 성능을 극대화했습니다. 로봇의 궤적을 긍정 샘플로 사용합니다.',
            importance: '최신 거대 AI 모델(Foundation Model)을 오프로드 주행에 접목하여 데이터 부족 문제를 해결하고 일반화 성능을 높였습니다.',
            gap: 'WVN과 달리 온라인 실시간 학습보다는 강력한 사전 학습 모델 활용에 더 초점을 맞췄을 가능성이 있습니다.',
            gap_filled: '인간 운전자의 주행 데이터를 긍정 샘플로, 그 외 영역을 부정 샘플로 설정하고 대조 학습(Contrastive Learning)을 수행했습니다.',
            achievement: '다양한 오프로드 환경에서 기존 방법들을 압도하는 성능을 보였으며, 제로 샷(Zero-shot) 일반화 능력도 입증했습니다.',
            data_used: '자체 수집한 오프로드 주행 데이터셋.',
            limitations: '여전히 인간의 시범 주행 데이터에 의존도가 높습니다.'
        }
    },
    'hadsell2009': {
        tag: 'SELF-SUPERVISED', color: 'green', x: 0.5, y: 0.7,
        title: '[9] Learning Long-range Vision for Autonomous Off-road Driving',
        authors: 'Hadsell et al. (2009)',
        link: 'https://doi.org/10.1002/ROB.20276',
        summary: '근거리 시각 정보를 원거리로 전파하여 장거리 자율 주행 가능케 함.',
        analysis: {
            new_work: '"근거리에서 원거리로(Near-to-Far)" 학습 개념을 제안했습니다. 로봇 바로 앞(근거리)의 지형은 스테레오 카메라로 정확히 알 수 있으므로, 이를 정답지로 삼아 멀리 있는(원거리) 지형을 학습합니다.',
            importance: '로봇은 항상 멀리를 보고 계획을 세워야 합니다. 근거리의 확실한 정보로 원거리의 불확실한 정보를 학습한다는 아이디어는 장거리 자율 주행의 핵심이 되었습니다.',
            gap: '당시에는 학습 속도가 느려 온라인으로 빠르게 적응하기 어려웠습니다. 또한, 스테레오 비전 기반의 기하학적 정보에 의존했기 때문에 오류 전파 문제가 있었습니다.',
            gap_filled: '근거리의 스테레오 분석 결과를 레이블로 사용하여, 이미지의 시각적 패턴(Texture, Color)을 학습하는 신경망을 훈련시켰습니다.',
            achievement: '로봇이 멀리 있는 숲길이나 장애물을 미리 인식하고 경로를 계획할 수 있게 함으로써, 근시안적인 행동을 방지하고 주행 속도를 높였습니다.',
            data_used: 'LAGR 로봇과 다양한 오프로드 환경 데이터를 사용했습니다.',
            limitations: '근거리 스테레오 비전이 틀리면 원거리 학습도 틀리게 되는 오류 전파 문제가 있었습니다.'
        }
    },

    // === Part 4. Anomalies (2.4절) ===
    'richter2017': {
        tag: 'ANOMALY', color: 'orange', x: 0.4, y: 0.4,
        title: '[32] Safe visual navigation via novelty detection',
        authors: 'Richter & Roy (2017)',
        link: 'https://doi.org/10.15607/RSS.2017.XIII.064',
        summary: '오토인코더로 낯선 환경(Novelty)을 감지하면 신경망을 끄고 안전한 기본 동작 수행.',
        analysis: {
            new_work: '충돌 예측 신경망의 불확실성을 감지하기 위해 오토인코더(Autoencoder) 기반의 이상 탐지기를 도입했습니다. 입력이 낯선 환경(Novelty)이라고 판단되면 안전한 기본 동작으로 전환합니다.',
            importance: '딥러닝 모델이 낯선 데이터에 대해 과신(Overconfident)하는 문제를 해결하여 주행 안전성을 확보했습니다.',
            gap: '안전을 위해 너무 보수적으로 행동하여 주행 속도가 느려지거나 멈추는 경우가 발생할 수 있습니다.',
            gap_filled: '오토인코더의 재구성 오차(Reconstruction Error)가 크면 "이상함"으로 판단하고 속도를 줄이거나 멈춥니다.',
            achievement: '익숙한 환경에서는 빠르게, 낯선 환경에서는 조심스럽게 주행하며 충돌을 방지했습니다.',
            data_used: 'RC카를 이용한 실내 복도 주행 데이터.',
            limitations: '환경이 조금만 바뀌어도 "위험"으로 판단할 수 있는 민감성 문제가 있습니다.'
        }
    },
    'wellhausen2020': {
        tag: 'ANOMALY', color: 'orange', x: 0.45, y: 0.5,
        title: '[5] Safe Robot Navigation Via Multi-Modal Anomaly Detection',
        authors: 'Wellhausen et al. (2020)',
        link: 'https://doi.org/10.1109/LRA.2020.2967706',
        summary: 'RGB, Depth, Normal 등 멀티모달 정보를 결합해 "평소와 다른 위험한 땅"을 탐지.',
        analysis: {
            new_work: '"무엇이 장애물인가" 대신 **"무엇이 안전한 땅인가"**를 학습하는 이상 탐지 방식을 제안했습니다. RGB, Depth, Surface Normals 등 다양한 모달리티를 결합했습니다.',
            importance: '학습하지 않은 장애물(불, 마네킹 등)도 "안전하지 않음(Anomaly)"으로 판단하여 피할 수 있게 합니다.',
            gap: '여전히 "아는 것과 다르면 위험하다"는 보수적인 접근 때문에, 안전하지만 처음 보는 지형도 위험하다고 판단하여 로봇이 멈춰버릴 수 있습니다.',
            gap_filled: '정상적인(안전한) 주행 데이터만으로 모델을 학습시키고, 주행 중 입력 데이터가 분포를 벗어나면 이상치(Anomaly)로 간주합니다.',
            achievement: '물 웅덩이, 불, 마네킹 등 학습하지 않은 장애물도 효과적으로 탐지하고 회피했습니다.',
            data_used: 'ANYmal 로봇 데이터.',
            limitations: '정상 데이터의 범위를 어떻게 정의하느냐에 따라 성능이 크게 좌우됩니다.'
        }
    },
    'schmid2022': {
        tag: 'ANOMALY', color: 'orange', x: 0.5, y: 0.6,
        title: '[33] Self-Supervised Traversability Prediction via Reconstruction',
        authors: 'Schmid et al. (2022)',
        link: 'https://doi.org/10.1109/IROS47612.2022.9981368',
        summary: '로봇이 지나간 "안전한 땅"만 재구성하도록 학습하여, 재구성이 안 되는 곳을 장애물로 판단.',
        analysis: {
            new_work: '로봇이 지나간 궤적(Safe terrain)의 이미지만을 **재구성(Reconstruct)**하도록 오토인코더를 학습시켰습니다. 재구성이 잘 안 되는 곳은 장애물로 식별합니다.',
            importance: '부정적인 샘플(충돌 데이터) 없이도 긍정적인 샘플(주행 궤적)만으로 주행 가능/불가능을 구분할 수 있게 했습니다.',
            gap: '재구성 기반 방법은 조명 변화나 시각적 아티팩트에 민감하여 오탐지가 발생할 수 있습니다.',
            gap_filled: '바퀴 궤적을 이미지에 투영하고, 해당 영역을 마스킹하여 오토인코더를 학습시킵니다.',
            achievement: '다양한 오프로드 환경에서 식생(Vegetation)과 지면(Ground)을 효과적으로 구분했습니다.',
            data_used: 'Polaris RZR(오프로드 차량) 데이터.',
            limitations: '그림자나 빛의 변화에 따라 재구성 오차가 커져 잘못된 판단을 내릴 수 있습니다.'
        }
    },
    'ji2022': {
        tag: 'ANOMALY', color: 'orange', x: 0.6, y: 0.45,
        title: '[34] Proactive Anomaly Detection for Robot Navigation',
        authors: 'Ji et al. (2022)',
        link: 'https://doi.org/10.1109/LRA.2022.3153989',
        summary: '현재 상태뿐만 아니라 미래의 계획된 경로와 결합하여 실패 확률을 선제적으로 예측.',
        analysis: {
            new_work: '단순히 현재 상태의 이상함을 감지하는 것이 아니라, **미래의 계획된 경로**와 현재 관측을 결합하여 미래의 실패 확률을 선제적으로(Proactive) 예측했습니다.',
            importance: '사고가 나기 직전에 멈추는 것이 아니라, 사고가 날 것 같은 경로를 미리 피할 수 있게 해줍니다.',
            gap: 'WVN과 달리 온라인 적응보다는 사전에 학습된 모델을 활용하여 다양한 환경에서의 실시간 적응력은 낮을 수 있습니다.',
            gap_filled: '카메라와 LiDAR 데이터를 융합하고, 로봇의 미래 행동 예측을 입력으로 받는 심층 신경망(PAAD)을 제안했습니다.',
            achievement: '농업용 로봇 데이터셋에서 기존 방법보다 높은 실패 예측 성능을 보였습니다.',
            data_used: '농업 환경(옥수수밭 등)에서의 로봇 주행 데이터.',
            limitations: '센서가 모두 가려지는 상황(완전 폐색)에서는 오작동할 수 있습니다.'
        }
    },
    'seo2023': {
        tag: 'ANOMALY', color: 'orange', x: 0.65, y: 0.65,
        title: '[35] ScaTE: Scalable framework for self-supervised',
        authors: 'Seo et al. (2023)',
        link: 'https://doi.org/10.1109/LRA.2023.3234768',
        summary: 'PU Learning(Positive-Unlabeled)을 도입해 가보지 않은 곳의 불확실성을 체계적으로 다룸.',
        analysis: {
            new_work: '**PU Learning (Positive-Unlabeled Learning)**을 도입하여, 주행한 데이터(Positive)와 알 수 없는 데이터(Unlabeled)의 불확실성을 체계적으로 다루었습니다.',
            importance: '자기 지도 학습 데이터의 본질적인 문제(가본 곳만 안다)를 해결하여, 가보지 않은 곳에 대한 판단 신뢰도를 높였습니다.',
            gap: '포인트 클라우드 기반이므로, 시각적 정보(색상, 텍스처)가 주는 세밀한 정보는 활용하지 못할 수 있습니다.',
            gap_filled: '주행 경험을 바탕으로 회귀(Regression)와 분류(Classification)를 동시에 수행하는 네트워크를 학습시킵니다.',
            achievement: '다양한 차량(소형차, SUV, 6륜 로봇)에 대해 각각 다른 주행 가능성을 성공적으로 학습했습니다.',
            data_used: 'CarMaker 시뮬레이션 및 RELLIS-3D 데이터셋.',
            limitations: '차량마다 개별적인 학습 과정이 필요합니다.'
        }
    },

    // === Extra References (Basic Info with Links) ===
    'gibson1979': { tag: 'REF', color: 'slate', x: 0.5, y: 0.1, title: '[1] The Ecological Approach to Visual Perception', authors: 'Gibson (1979)', link: 'https://library.uniq.edu.iq/storage/books/file/The%20Ecological%20Approach%20to%20Visual%20Perception%20Approach/1667383098The%20Ecological%20Approach%20to%20Visual%20Perception%20Classic%20Edition%20(James%20J.%20Gibson)%20(z-lib.org)%20(1).pdf', summary: '시각적 인지 이론의 기초 문헌.' },
    'miki2022': { tag: 'REF', color: 'slate', x: 0.3, y: 0.8, title: '[3] Learning Robust Perceptive Locomotion', authors: 'Miki et al. (2022)', link: 'https://doi.org/10.1126/SCIROBOTICS.ABK2822', summary: '보행 로봇을 위한 강인한 인지 기반 보행 학습.' },
    'frey2023': { tag: 'REF', color: 'slate', x: 0.9, y: 0.9, title: '[10] Fast Traversability Estimation (Predecessor)', authors: 'Frey et al. (2023)', link: 'https://arxiv.org/abs/2305.08510', summary: 'WVN의 전신 연구.' },
    'caron2021': { tag: 'REF', color: 'purple', x: 1.0, y: 0.5, title: '[11] Emerging Properties in Self-Supervised Vision Transformers (DINO)', authors: 'Caron et al. (2021)', link: 'https://doi.org/10.1109/ICCV48922.2021.00951', summary: 'WVN의 시각 백본으로 사용된 DINO 모델.' },
    'hamilton2022': { tag: 'REF', color: 'purple', x: 1.0, y: 0.6, title: '[12] Unsupervised semantic segmentation (STEGO)', authors: 'Hamilton et al. (2022)', link: 'https://openreview.net/forum?id=SaKO6z6Hl0c', summary: 'WVN에서 시맨틱 분할에 활용된 STEGO.' },
    'achanta2012': { tag: 'REF', color: 'green', x: 0.8, y: 0.2, title: '[13] SLIC Superpixels', authors: 'Achanta et al. (2012)', link: 'https://doi.org/10.1109/TPAMI.2012.120', summary: '이미지를 슈퍼픽셀로 분할하여 처리 속도 향상.' },
    'quigley2009': { tag: 'REF', color: 'slate', x: 0.1, y: 0.1, title: '[14] ROS: an open-source Robot Operating System', authors: 'Quigley et al. (2009)', link: '#', summary: '로봇 운영체제 ROS.' },
    'chung2023': { tag: 'REF', color: 'slate', x: 0.2, y: 0.2, title: '[15] Into the Robotic Depths (DARPA SubT)', authors: 'Chung et al. (2023)', link: 'https://doi.org/10.1146/ANNUREV-CONTROL-062722-100728', summary: 'DARPA 지하 챌린지 분석.' },
    'katevenis1991': { tag: 'REF', color: 'slate', x: 0.1, y: 0.1, title: '[36] Weighted round-robin cell multiplexing', authors: 'Katevenis et al. (1991)', link: 'https://doi.org/10.1109/49.105173', summary: '네트워크 스위칭 관련 기술.' },
    'lee2017': { tag: 'REF', color: 'cyan', x: 0.2, y: 0.3, title: '[37] Incremental Nonparametric Bayesian Clustering', authors: 'Lee et al. (2017)', link: 'https://doi.org/10.1007/S10514-016-9588-7', summary: '주행 가능 영역 탐지를 위한 클러스터링 기법.' },
    'cai2023': { tag: 'REF', color: 'purple', x: 0.8, y: 0.6, title: '[38] EVORA: deep evidential traversability learning', authors: 'Cai et al. (2023)', link: 'https://doi.org/10.48550/ARXIV.2311.06234', summary: '위험 인지 오프로드 주행을 위한 증거 기반 학습.' },
    'kingma2015': { tag: 'REF', color: 'slate', x: 0.5, y: 0.5, title: '[39] Adam: A Method for Stochastic Optimization', authors: 'Kingma & Ba (2015)', link: 'https://arxiv.org/abs/1412.6980', summary: '딥러닝 최적화 알고리즘 Adam.' },
    'miki2022_elev': { tag: 'REF', color: 'cyan', x: 0.3, y: 0.5, title: '[40] Elevation Mapping for Locomotion', authors: 'Miki et al. (2022)', link: 'https://doi.org/10.1109/IROS47612.2022.9981507', summary: 'GPU 가속 높이 매핑.' },
    'erni2023': { tag: 'REF', color: 'cyan', x: 0.4, y: 0.6, title: '[41] MEM: Multi-Modal Elevation Mapping', authors: 'Erni et al. (2023)', link: 'https://doi.org/10.1109/IROS55552.2023.10342108', summary: '멀티모달 높이 매핑.' },
    'mattamala2022': { tag: 'REF', color: 'green', x: 0.3, y: 0.7, title: '[42] An Efficient Locally Reactive Controller', authors: 'Mattamala et al. (2022)', link: 'https://doi.org/10.1109/LRA.2022.3143196', summary: '안전한 내비게이션을 위한 반응형 제어기.' },
    'paszke2019': { tag: 'REF', color: 'slate', x: 0.5, y: 0.5, title: '[43] PyTorch', authors: 'Paszke et al. (2019)', link: 'https://arxiv.org/abs/1912.01703', summary: '딥러닝 라이브러리 파이토치.' },
    'wermelinger2016': { tag: 'REF', color: 'cyan', x: 0.2, y: 0.4, title: '[44] Navigation Planning for Legged Robots', authors: 'Wermelinger et al. (2016)', link: 'https://doi.org/10.1109/IROS.2016.7759199', summary: '험지에서의 다족 로봇 주행 계획.' }
};

// --- 2. Initialize UI ---
document.addEventListener('DOMContentLoaded', () => {
    initLandscape();
    renderPaperGrid();
    initTechDetails('dino');
    initSimulator();
});

// --- 3. Render Functions (Visuals) ---
function renderPaperGrid() {
    // 1. HTML에서 두 개의 그리드 컨테이너를 가져옵니다.
    const mainGrid = document.getElementById('main-paper-grid'); // 주요 논문용
    const refGrid = document.getElementById('ref-paper-grid');   // 참조 논문용

    // 안전장치: HTML 구조가 아직 변경되지 않았을 경우를 대비합니다.
    if (!mainGrid || !refGrid) {
        console.error("HTML에 'main-paper-grid' 또는 'ref-paper-grid' 요소가 없습니다. index.html을 확인해주세요.");
        return;
    }

    // 2. 그리드 내용을 초기화합니다.
    mainGrid.innerHTML = '';
    refGrid.innerHTML = '';

    // 3. 데이터를 정렬합니다 (CORE 태그가 가장 먼저 오도록).
    const keys = Object.keys(papers).sort((a, b) => {
        if (papers[a].tag === 'CORE') return -1;
        if (papers[b].tag === 'CORE') return 1;
        return 0;
    });

    // 4. 각 논문 데이터를 순회하며 카드를 생성하고 분류합니다.
    keys.forEach(key => {
        const p = papers[key];
        const isRef = p.tag === 'REF'; // 현재 논문이 참조 논문인지 확인
        const card = document.createElement('div');

        if (isRef) {
            // === [B] 단순 참조 논문 스타일 (간소화됨, 모달 X, 원문 버튼 O) ===
            card.className = `bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all flex flex-col h-full group bg-white`;
            const link = p.link || '#';
            
            card.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <span class="px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-500 border border-slate-200">${p.tag}</span>
                </div>
                <h4 class="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">${p.title}</h4>
                <p class="text-xs text-slate-500 mb-3 truncate">${p.authors}</p>
                <div class="flex-grow mb-5">
                    <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">${p.summary}</p>
                </div>
                <a href="${link}" target="_blank" class="inline-flex items-center justify-center w-full px-3 py-2.5 text-sm font-bold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                    <i class="fas fa-external-link-alt mr-2"></i> 원문 논문 보기
                </a>
            `;
            refGrid.appendChild(card); // 참조 그리드에 추가

        } else {
            // === [A] 본문 심층 분석 논문 스타일 (기존 상세 스타일 유지, 모달 O) ===
            card.onclick = () => openModal(key); // 클릭 시 모달 열기
            card.className = `bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer hover:border-${p.color}-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full relative overflow-hidden group`;
            
            // 태그 색상 결정
            let tagColor = 'bg-slate-100 text-slate-700';
            if (p.color === 'blue') tagColor = 'bg-blue-100 text-blue-700';
            if (p.color === 'cyan') tagColor = 'bg-cyan-100 text-cyan-700';
            if (p.color === 'purple') tagColor = 'bg-purple-100 text-purple-700';
            if (p.color === 'green') tagColor = 'bg-green-100 text-green-700';
            if (p.color === 'orange') tagColor = 'bg-orange-100 text-orange-700';

            // CORE 논문 강조 표시 (선택 사항)
            const coreRibbon = p.tag === 'CORE' ? '<div class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-sm">WVN 본문</div>' : '';

            card.innerHTML = `
                ${coreRibbon}
                <div class="mb-4"><span class="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase ${tagColor}">${p.tag}</span></div>
                <h4 class="font-bold text-slate-800 text-lg leading-snug mb-2 line-clamp-2 group-hover:text-${p.color}-600 transition-colors">${p.title}</h4>
                <p class="text-sm text-slate-500 mb-4 flex items-center"><i class="far fa-user-circle mr-2"></i>${p.authors}</p>
                <div class="flex-grow">
                    <p class="text-sm text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <i class="fas fa-quote-left text-slate-300 mr-2 text-xs"></i>${p.summary}
                    </p>
                </div>
                <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-${p.color}-600 font-bold text-sm">
                    <span class="group-hover:underline">상세 분석 7종 보기</span>
                    <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                </div>`;
            mainGrid.appendChild(card); // 메인 그리드에 추가
        }
    });
}

function initLandscape() {
    const traceData = {
        x: [], y: [], text: [], mode: 'markers+text',
        textposition: 'top center',
        marker: { size: [], color: [] },
        type: 'scatter'
    };

    Object.keys(papers).forEach(key => {
        const p = papers[key];
        traceData.x.push(p.x);
        traceData.y.push(p.y);
        traceData.text.push(p.tag === 'CORE' ? 'WVN' : ''); 
        traceData.marker.size.push(p.tag === 'CORE' ? 40 : 18);
        
        let c = '#94a3b8';
        if(p.color === 'blue') c = '#2563eb';
        if(p.color === 'cyan') c = '#06b6d4';
        if(p.color === 'purple') c = '#9333ea';
        if(p.color === 'green') c = '#16a34a';
        if(p.color === 'orange') c = '#ea580c';
        traceData.marker.color.push(c);
    });

    const layout = {
        hovermode: 'closest', showlegend: false,
        margin: {t: 20, l: 40, r: 20, b: 40},
        xaxis: { title: 'Visual Dependence (Geometry → Vision)', range: [0, 1.1], showgrid: true },
        yaxis: { title: 'Adaptability (Offline → Online)', range: [0, 1.1], showgrid: true },
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)'
    };

    Plotly.newPlot('landscapeChart', [traceData], layout, {responsive: true, displayModeBar: false});
    document.getElementById('landscapeChart').on('plotly_click', function(data){
        openModal(Object.keys(papers)[data.points[0].pointIndex]);
    });
}

// --- 4. Modal Logic ---
function openModal(key) {
    const p = papers[key];
    if (!p) return;

    // 1. 모달 헤더 (태그, 제목, 저자) 채우기
    const tagEl = document.getElementById('modal-tag');
    let colorClass = 'bg-slate-100 text-slate-700';
    if(p.color === 'blue') colorClass = 'bg-blue-100 text-blue-700';
    else if(p.color === 'cyan') colorClass = 'bg-cyan-100 text-cyan-700';
    else if(p.color === 'purple') colorClass = 'bg-purple-100 text-purple-700';
    else if(p.color === 'green') colorClass = 'bg-green-100 text-green-700';
    else if(p.color === 'orange') colorClass = 'bg-orange-100 text-orange-700';
    
    tagEl.className = `px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block ${colorClass}`;
    tagEl.innerText = p.tag;
    
    document.getElementById('modal-title').innerText = p.title;
    document.getElementById('modal-authors').innerText = p.authors;

    // 2. 핵심 요약 채우기 (HTML에 있는 modal-summary ID 사용)
    const summaryEl = document.getElementById('modal-summary');
    if (summaryEl) summaryEl.innerText = p.summary;

    // 3. 링크 설정
    const linkEl = document.getElementById('modal-link');
    if (linkEl) linkEl.href = p.link || '#';

    // 4. 상세 분석 내용 생성 (HTML로 조립)
    const a = p.analysis || {};
    const detailHTML = `
        <div class="space-y-8 animate-fade-in pt-4">
            ${p.method ? `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 class="font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="fas fa-cogs text-blue-500"></i> Method</h4>
                    <div class="text-sm text-slate-600 prose prose-sm"><ul class="list-disc pl-4 space-y-1">${p.method}</ul></div>
                </div>
                <div class="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 class="font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="fas fa-chart-bar text-green-500"></i> Results</h4>
                    <div class="text-sm text-slate-600 prose prose-sm"><ul class="list-disc pl-4 space-y-1">${p.results || 'N/A'}</ul></div>
                </div>
                <div class="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 class="font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="fas fa-flag-checkered text-purple-500"></i> Conclusion</h4>
                    <p class="text-sm text-slate-600 leading-relaxed">${p.conclusion || 'N/A'}</p>
                </div>
            </div>` : ''}

            <div class="border-t border-slate-200 pt-8">
                <h4 class="text-slate-900 font-bold text-xl mb-6 flex items-center gap-2">
                    <span class="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-xs">7</span>
                    심층 분석 (Deep Dive)
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div class="flex items-center gap-2 mb-2"><span class="w-2 h-2 rounded-full bg-blue-500"></span><h5 class="font-bold text-slate-800 text-sm uppercase tracking-wide">1. What is New?</h5></div>
                        <p class="text-sm text-slate-600 leading-relaxed">${a.new_work || '-'}</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div class="flex items-center gap-2 mb-2"><span class="w-2 h-2 rounded-full bg-blue-500"></span><h5 class="font-bold text-slate-800 text-sm uppercase tracking-wide">2. Importance</h5></div>
                        <p class="text-sm text-slate-600 leading-relaxed">${a.importance || '-'}</p>
                    </div>
                    <div class="bg-orange-50 p-5 rounded-xl border border-orange-100">
                        <div class="flex items-center gap-2 mb-2"><i class="fas fa-exclamation-circle text-orange-500 text-xs"></i><h5 class="font-bold text-orange-800 text-sm uppercase tracking-wide">3. Literature Gap</h5></div>
                        <p class="text-sm text-slate-700 leading-relaxed">${a.gap || '-'}</p>
                    </div>
                    <div class="bg-green-50 p-5 rounded-xl border border-green-100">
                        <div class="flex items-center gap-2 mb-2"><i class="fas fa-check-circle text-green-500 text-xs"></i><h5 class="font-bold text-green-800 text-sm uppercase tracking-wide">4. Gap Filled</h5></div>
                        <p class="text-sm text-slate-700 leading-relaxed">${a.gap_filled || '-'}</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h5 class="font-bold text-slate-800 text-sm mb-2"><i class="fas fa-trophy text-yellow-500 mr-2"></i>5. Achievement</h5>
                        <p class="text-sm text-slate-600 leading-relaxed">${a.achievement || '-'}</p>
                    </div>
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h5 class="font-bold text-slate-800 text-sm mb-2"><i class="fas fa-database text-slate-400 mr-2"></i>6. Data Used</h5>
                        <p class="text-sm text-slate-600 leading-relaxed">${a.data_used || '-'}</p>
                    </div>
                    <div class="md:col-span-2 bg-red-50 p-5 rounded-xl border border-red-100 flex gap-4 items-start">
                        <i class="fas fa-triangle-exclamation text-red-500 mt-1"></i>
                        <div>
                            <h5 class="font-bold text-red-800 text-sm mb-1">7. Limitations</h5>
                            <p class="text-sm text-red-700 leading-relaxed">${a.limitations || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    // 5. 상세 내용 주입 (HTML에 있는 modal-method ID 사용)
    const methodEl = document.getElementById('modal-method');
    if (methodEl) {
        methodEl.innerHTML = detailHTML;
    } else {
        console.error("HTML에서 id='modal-method' 요소를 찾을 수 없습니다.");
        return;
    }

    // 6. 모달창 띄우기
    const modal = document.getElementById('paperModal');
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
        document.body.style.overflow = 'hidden'; // 배경 스크롤 막기
    }
}

function closeModal() {
    const modal = document.getElementById('paperModal');
    modal.classList.remove('open');
    setTimeout(() => modal.classList.add('hidden'), 300);
    document.body.style.overflow = 'auto';
}

// --- 5. Tech Stack & Simulator (Static with Images) ---
const techData = { 
    'dino': { 
        title: '1. Vision Transformer (DINO) - "세상을 직관적으로 묶어보는 눈"', 
        imgUrl: './images/dino.png', // 교체: 논문의 DINO/ViT 설명 다이어그램 캡처본
        desc: `
            <div class="space-y-3">
                <p><strong class="text-blue-600"><i class="fas fa-lightbulb"></i> 초보자를 위한 비유:</strong><br>어린아이가 숲에 처음 갔을 때, '풀'이나 '바위'라는 이름을 몰라도 <strong>"초록색이고 부드러운 것들"</strong>과 <strong>"회색이고 단단한 것들"</strong>을 본능적으로 구분하는 것과 같습니다.</p>
                <hr class="border-slate-200">
                <p><strong>논문의 핵심 원리:</strong><br>DINO는 사람이 정답(라벨)을 알려주지 않아도 스스로 특징을 학습하는 AI 모델입니다. 단순한 색상이 아니라 물체의 <strong>의미와 형태(Semantic Features)</strong>를 파악하는 능력(발현성, Emerging Properties)을 스스로 터득합니다.</p>
                <p><strong>WVN에서의 역할:</strong><br>기존 로봇들은 라이다(LiDAR)로 거리만 재서 부드러운 풀숲도 '막힌 벽'으로 착각했습니다. 하지만 DINO를 장착한 로봇은 질감과 형태를 이해하여 <strong>"여기는 뚫고 지나갈 수 있는 풀숲"</strong>이라고 파악할 수 있는 시각적 통찰력을 얻습니다.</p>
            </div>
        ` 
    }, 
    'slic': { 
        title: '2. SLIC Superpixels - "생각의 속도를 높이는 퍼즐 맞추기"', 
        imgUrl: './images/slic.png', // 교체: 논문 [Image 106] 근처의 SLIC 슈퍼픽셀 분할 결과 이미지
        desc: `
            <div class="space-y-3">
                <p><strong class="text-green-600"><i class="fas fa-lightbulb"></i> 초보자를 위한 비유:</strong><br>10,000조각짜리 복잡한 직소 퍼즐을 풀 때, 색깔과 무늬가 비슷한 조각들을 미리 <strong>100개의 큰 덩어리</strong>로 묶어놓고 시작하면 퍼즐 맞추는 속도가 엄청나게 빨라지는 것과 같습니다.</p>
                <hr class="border-slate-200">
                <p><strong>논문의 핵심 원리:</strong><br>고해상도 이미지의 수많은 픽셀을 일일이 계산하는 대신, 색상과 공간적 위치가 비슷한 픽셀들을 묶어 <strong>슈퍼픽셀(Superpixel)</strong>이라는 덩어리로 만듭니다. O(N)이라는 선형 복잡도를 가져 계산이 매우 빠릅니다.</p>
                <p><strong>WVN에서의 역할:</strong><br>야생을 달리는 로봇은 1초에도 수십 번씩 찰나의 판단을 해야 합니다. SLIC은 이미지 데이터를 초고속으로 요약(압축)해주어, 컴퓨팅 자원이 부족한 모바일 로봇에서도 <strong>20Hz 이상의 실시간 주행 판단</strong>을 가능하게 만듭니다.</p>
            </div>
        ` 
    }, 
    'stego': { 
        title: '3. STEGO - "흐릿한 경계를 칼로 자른 듯 선명하게"', 
        imgUrl: './images/stego.png', // 교체: 논문의 Feature Distillation 구조도 또는 픽셀 분할 결과물
        desc: `
            <div class="space-y-3">
                <p><strong class="text-purple-600"><i class="fas fa-lightbulb"></i> 초보자를 위한 비유:</strong><br>경계선 없이 색칠만 되어 있어서 어디까지가 하늘이고 어디부터가 산인지 헷갈리는 수채화 그림에, <strong>아주 또렷한 검은색 펜으로 물체의 테두리(외곽선)를 정교하게 그려주는 작업</strong>입니다.</p>
                <hr class="border-slate-200">
                <p><strong>논문의 핵심 원리:</strong><br>DINO가 뭉뚱그려 파악한 이미지 특징들의 상관관계(Feature Correspondences)를 바탕으로, CRF(Conditional Random Field) 기술을 적용해 픽셀 단위로 의미를 정밀하게 분할(Segmentation)합니다.</p>
                <p><strong>WVN에서의 역할:</strong><br>어두운 그늘이 진 흙바닥이나 웅덩이 같은 헷갈리는 지형을 로봇이 정확하게 식별하게 해줍니다. <strong>정확한 지형의 경계선</strong>을 알아야 바퀴가 빠지거나 넘어지는 사고를 막을 수 있습니다.</p>
            </div>
        ` 
    }, 
    'loop': { 
        title: '4. Online Self-Supervision - "발바닥 감각을 시각적 기억으로"', 
        imgUrl: './images/loop.png', // 교체: 논문의 WVN 파이프라인 (속도 오차 계산 및 Supervision Graph) 구조도
        desc: `
            <div class="space-y-3">
                <p><strong class="text-orange-600"><i class="fas fa-lightbulb"></i> 초보자를 위한 비유:</strong><br>눈으로 빙판길을 보고 '안전하겠지' 생각하고 밟았다가 <strong>미끄러진 경험(발바닥 감각)</strong>을 한 뒤, 다음부터는 비슷한 색의 바닥을 눈으로 보기만 해도 '저긴 미끄러워!' 하고 피하는 원리입니다.</p>
                <hr class="border-slate-200">
                <p><strong>논문의 핵심 원리:</strong><br>로봇이 걷고 싶은 속도(명령)와 실제 걸어지는 속도의 차이인 <strong>속도 오차(Velocity Error)</strong>를 계산합니다. 오차가 크면 나쁜 길, 작으면 좋은 길로 점수를 매깁니다.</p>
                <p><strong>WVN에서의 역할 (핵심 기술):</strong><br>방금 지나온 길의 점수(고유수용감각)를 현재 로봇이 보고 있는 전방 카메라 이미지에 덧씌워 학습(Reprojection)합니다. 이 사이클을 통해 아무 정보도 없는 낯선 야생에 떨어져도 <strong>5분 안에 스스로 지형을 터득하고 달릴 수 있게</strong> 됩니다.</p>
            </div>
        ` 
    } 
};

function initTechDetails(key) { updateTech(key); }
function updateTech(key) {
    // 1. 버튼 활성화 상태 변경
    document.querySelectorAll('.tech-btn').forEach(b => { 
        b.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500'); 
        b.classList.add('border-slate-200'); 
    });
    const btn = document.getElementById('btn-'+key);
    if(btn) { 
        btn.classList.remove('border-slate-200'); 
        btn.classList.add('border-blue-500', 'ring-1', 'ring-blue-500'); 
    }
    
    // 2. 데이터 가져오기
    const d = techData[key];

    // 3. 이미지와 텍스트 렌더링
    document.getElementById('tech-detail-content').innerHTML = `
        <h3 class="text-2xl font-black text-slate-800 mb-6 animate-fade-in">${d.title}</h3>
        
        <div class="mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-100 flex items-center justify-center min-h-[250px]">
            <img src="${d.imgUrl}" alt="${d.title}" class="w-full max-h-[300px] object-cover object-center group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <span class="text-white text-sm font-bold bg-black/60 px-4 py-2 rounded-lg"><i class="fas fa-file-pdf mr-2"></i>논문의 실제 Figure 캡처본으로 교체하세요</span>
            </div>
        </div>

        <div class="text-slate-700 leading-relaxed text-[15px] bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-inner">
            ${d.desc}
        </div>
    `;

    // 4. (선택) 이전의 쓸모없는 하단 차트는 숨김 처리
    const vizPlot = document.getElementById('techVizPlot');
    if(vizPlot) vizPlot.style.display = 'none';
}

// --- 6. PDF Upload Logic (Gemini 2.0 Flash) ---
// 삭제

// --- 7. Simulator Logic (5 Steps) ---
const simSteps = [
    {
        status: "SENSING",
        title: "Step 1: Raw Input (Vision + Proprioception)",
        imgUrl: './images/step1.png', 
        desc: "<span class='text-blue-500 font-bold'>[원시 데이터]</span> 카메라로 들어온 야생의 시각 정보와, 바퀴에서 느껴지는 진동(속도 오차) 정보입니다. 아직 로봇은 어디가 밟을 수 있는 길인지 알지 못합니다."
    },
    {
        status: "EXTRACTING",
        title: "Step 2: Semantic Feature Extraction (DINO)",
        imgUrl: './images/step2.png', 
        desc: "<span class='text-purple-500 font-bold'>[DINO 비전 트랜스포머]</span> 라벨링 없이도 물체의 형태와 질감을 스스로 파악(Self-distillation)하여, 풀과 바위를 의미론적 특징(Semantic Features)으로 분리해냅니다."
    },
    {
        status: "COMPRESSING",
        title: "Step 3: Superpixel Sub-sampling (SLIC)",
        imgUrl: './images/step3.png', 
        desc: "<span class='text-green-500 font-bold'>[SLIC 알고리즘]</span> 20Hz 실시간 처리를 위해 선형 복잡도 O(N)를 가지는 SLIC을 사용하여, DINO의 특징 맵을 수백 개의 큼직한 모자이크 타일(슈퍼픽셀)로 압축합니다."
    },
    {
        status: "LEARNING",
        title: "Step 4: Self-Supervised Labeling (The Loop)",
        imgUrl: './images/step4.png', 
        desc: "<span class='text-orange-500 font-bold'>[자기 지도 학습]</span> 과거에 직접 밟아보고 느꼈던 경험(속도 오차)을 현재 시야의 모자이크 타일에 투영(Reprojection)합니다. 흔들렸던 곳은 빨간색, 안전했던 곳은 초록색으로 스스로 라벨을 부여합니다."
    },
    {
        status: "PLANNING",
        title: "Step 5: Final Traversability Costmap",
        imgUrl: './images/step5.png', 
        desc: "<span class='text-slate-500 font-bold'>[주행 비용 지도]</span> 투영된 정보를 바탕으로 최종 2D 지도를 생성합니다. 가장 안전한 초록색 영역의 중앙(Smart Carrot)을 목표로 삼아 로봇이 자율 주행을 수행합니다."
    }
];

function initSimulator() {
    setStep(0);
}

function setStep(stepIndex) {
    // 버튼 스타일 업데이트
    for(let i=0; i<5; i++) {
        let btn = document.getElementById('step-btn-' + i);
        if(btn) {
            if(i === stepIndex) {
                btn.classList.add('border-blue-500', 'bg-slate-700');
                btn.classList.remove('border-transparent', 'bg-slate-700/50');
            } else {
                btn.classList.remove('border-blue-500', 'bg-slate-700');
                btn.classList.add('border-transparent', 'bg-slate-700/50');
            }
        }
    }

    const s = simSteps[stepIndex];
    
    const statusEl = document.getElementById('sim-status');
    if(statusEl) statusEl.innerText = s.status;
    const stepTextEl = document.getElementById('sim-step-text');
    if(stepTextEl) stepTextEl.innerText = `STEP ${stepIndex + 1} / 5`;
    
    const imgEl = document.getElementById('sim-image');
    if(imgEl) {
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = s.imgUrl;
            imgEl.style.opacity = 1;
        }, 300); 
    }

    const titleEl = document.getElementById('overlay-title');
    if(titleEl) titleEl.innerHTML = s.title;
    const descEl = document.getElementById('overlay-desc');
    if(descEl) descEl.innerHTML = s.desc;
}

let simInterval;
function playSimulation() {
    let s = 0;
    if(simInterval) clearInterval(simInterval);
    setStep(s);
    
    const btn = document.querySelector('button[onclick="playSimulation()"]');
    if(btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Running...';

    simInterval = setInterval(() => {
        s++;
        if(s >= simSteps.length) {
            clearInterval(simInterval);
            if(btn) btn.innerHTML = '<i class="fas fa-play mr-2"></i> Auto Sequence';
        } else {
            setStep(s);
        }
    }, 3500); 
}

// --- 8. 유틸리티 함수 & 스크롤 스파이 (네비게이션 상태 자동 업데이트) ---

// 섹션 ID와 네비게이션 버튼 인덱스 매핑
const sectionMap = {
    'hero': 0,       // 개요
    'library': 1,    // 논문 라이브러리
    'tech-stack': 2, // 기술 분석
    'pipeline': 3    // 시뮬레이터
};

// 현재 활성화된 섹션에 따라 네비게이션 버튼 스타일 업데이트 함수
function updateActiveNav(sectionId) {
    const navItems = document.querySelectorAll('.nav-item');
    const activeIndex = sectionMap[sectionId];

    if (activeIndex === undefined) return;

    navItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.add('active'); // style.css에 정의된 파란색 스타일 적용
            item.classList.add('text-blue-600'); // Tailwind 글자색 강제 적용 (필요시)
        } else {
            item.classList.remove('active');
            item.classList.remove('text-blue-600');
        }
    });
}

// 네비게이션 버튼 클릭 시 호출되는 함수 (수정됨)
function scrollToSection(sectionId) {
    // 1. 클릭 즉시 버튼 스타일 업데이트 (반응성 향상)
    updateActiveNav(sectionId);

    // 2. 부드러운 스크롤 이동
    const element = document.getElementById(sectionId);
    if (element) {
        // 고정된 헤더 높이(약 80px)만큼 덜 스크롤해서 제목이 가려지지 않게 함
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 스크롤 감지자(IntersectionObserver) 초기화 함수
function initScrollSpy() {
    const observerOptions = {
        root: null,
        // 화면 중앙에 섹션이 오면 감지 (뷰포트의 상하 50% 지점을 기준으로 판단)
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 섹션이 화면 중앙 영역에 들어오면
            if (entry.isIntersecting) {
                updateActiveNav(entry.target.id);
            }
        });
    }, observerOptions);

    // 감시할 섹션들을 등록
    Object.keys(sectionMap).forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

// 페이지 로드 시 스크롤 감지 시작
document.addEventListener('DOMContentLoaded', () => {
    // ... 기존의 다른 init 함수들은 그대로 두세요 ...
    initScrollSpy(); // 스크롤 스파이 시작!
});