import type { BlogArticle } from './types';

export const basicArticlesExpanded2: BlogArticle[] = [
  // article 1: mercury-retrograde-explained (with expanded ZH/JA/ES)
  {
    slug: 'mercury-retrograde-explained',
    category: 'basics',
    publishedAt: '2025-12-10',
    readingTime: 5,
    content: {
      ko: {
        title: '수성 역행이란 무엇인가: 당황하지 않고 역행 기간을 현명하게 보내는 법',
        excerpt: '수성 역행은 왜 일어나고, 실제로 우리 삶에 어떤 영향을 미칠까요? 소통, 기술, 계약에 관련된 혼란을 최소화하고 역행 에너지를 활용하는 실용적인 방법을 알아봅니다.',
        sections: [
          { type: 'p', text: '점성술 커뮤니티에서 수성 역행(Mercury Retrograde)만큼 화제가 되는 주제는 드뭅니다. 이메일이 잘못 전송되고, 컴퓨터가 갑자기 고장나고, 오래된 연인에게 연락이 오는 그 시기. 그러나 실제로 수성 역행이란 무엇이고, 그것이 정말 우리 삶에 영향을 미치는 걸까요?' },
          { type: 'h2', text: '수성 역행의 천문학적 원리' },
          { type: 'p', text: '역행(retrograde)은 행성이 실제로 거꾸로 움직이는 것이 아닙니다. 이것은 시각적 착시 현상입니다. 지구와 수성이 모두 태양 주위를 공전하지만 속도가 다르기 때문에, 특정 시점에서 수성이 지구를 "앞질러 가다가 다시 뒤처지는" 것처럼 보입니다. 마치 고속도로에서 더 빠른 차가 당신을 추월한 후 속도를 줄이면 당신이 앞서 가는 것처럼 보이는 것과 같습니다.' },
          { type: 'h2', text: '점성술에서 수성이 관장하는 영역' },
          { type: 'p', text: '수성은 소통, 사고, 여행, 기술, 계약, 정보 처리를 관장하는 행성입니다. 따라서 수성 역행 기간에는 이 영역들에서 혼란과 지연이 발생할 수 있다고 점성술에서는 해석합니다.' },
          { type: 'ul', items: [
            '소통 오해: 이메일 오발송, 대화 중 오해, 계약서 실수',
            '기술 문제: 컴퓨터 오류, 폰 분실, 전자기기 고장',
            '여행 지연: 항공편 취소, 길 헤매기, 예약 실수',
            '과거의 귀환: 오래된 친구나 연인의 연락, 과거 프로젝트 재검토'
          ]},
          { type: 'h2', text: '수성 역행을 현명하게 보내는 방법' },
          { type: 'p', text: '수성 역행 기간은 "re-" 접두사로 시작하는 모든 활동에 좋은 시기입니다. 되돌아보기(reflect), 재검토하기(review), 수정하기(revise), 재연결하기(reconnect)가 그것입니다.' },
          { type: 'ul', items: [
            '새로운 계약, 중요한 구매, 큰 결정은 가급적 미루기',
            '이메일과 문자 메시지를 보내기 전 한 번 더 확인하기',
            '여행 계획은 여유 있게 잡고 예비 계획 세우기',
            '진행 중인 프로젝트를 점검하고 오류 수정하기',
            '오래된 인연과 재연결하거나 과거를 마무리할 기회로 활용하기'
          ]},
          { type: 'h2', text: '수성 역행이 별자리별로 다른 영향을 미치나요?' },
          { type: 'p', text: '수성 역행은 특정 별자리에서 일어나기 때문에, 역행이 일어나는 별자리와 같거나 연관된 원소 별자리는 더 강한 영향을 받을 수 있습니다. 예를 들어 처녀자리와 쌍둥이자리는 수성을 지배 행성으로 가지고 있어 역행의 영향을 특히 민감하게 느낄 수 있습니다.' },
          { type: 'p', text: '중요한 것은, 수성 역행을 두려워할 필요는 없다는 것입니다. 이 시기를 잘 활용하면 오히려 미뤄뒀던 정리와 성찰, 과거와의 화해를 이루는 귀중한 시간이 될 수 있습니다. 수성 역행은 1년에 3-4번 약 3주간 발생합니다.' },
        ],
      },
      en: {
        title: 'Mercury Retrograde Explained: How to Navigate This Cosmic Event Without Panic',
        excerpt: 'Why does Mercury retrograde happen, and what does it actually affect? Learn to minimize communication chaos and harness retrograde energy productively.',
        sections: [
          { type: 'p', text: 'Few astrological events generate as much buzz as Mercury Retrograde. Emails go astray, computers crash, and exes mysteriously reappear. But what is Mercury retrograde really, and does it truly affect our lives?' },
          { type: 'h2', text: 'The Astronomical Explanation' },
          { type: 'p', text: 'Retrograde motion isn\'t the planet moving backward — it\'s an optical illusion. Because Earth and Mercury orbit the Sun at different speeds, Mercury sometimes appears to move backward relative to Earth. Think of it like being on a highway: when a faster car overtakes you then slows down, it appears to go backward from your perspective.' },
          { type: 'h2', text: 'What Mercury Rules in Astrology' },
          { type: 'ul', items: [
            'Communication: emails, conversations, negotiations, written agreements',
            'Technology: computers, phones, electronics',
            'Travel: short trips, transportation, scheduling',
            'Information: contracts, documents, data processing'
          ]},
          { type: 'h2', text: 'How to Navigate Mercury Retrograde' },
          { type: 'p', text: 'Mercury retrograde is an excellent period for all activities beginning with "re-": reflect, review, revise, reconnect, and reconsider.' },
          { type: 'ul', items: [
            'Avoid signing new contracts or making major purchases if possible',
            'Double-check emails and messages before sending',
            'Build extra buffer time into travel plans',
            'Review and revise ongoing projects for errors',
            'Reconnect with old friends or resolve unfinished past situations'
          ]},
          { type: 'h2', text: 'Does It Affect All Signs Equally?' },
          { type: 'p', text: 'Gemini and Virgo — the signs ruled by Mercury — tend to feel its retrograde most acutely. The sign in which retrograde occurs also influences which life areas are most affected. The key takeaway: Mercury retrograde (occurring 3-4 times yearly for about 3 weeks) doesn\'t have to be feared. Used wisely, it\'s a powerful period for reflection and completion.' },
        ],
      },
      zh: {
        title: '水星逆行是什么：如何从容不迫地度过这段特殊时期',
        excerpt: '水星逆行为什么会发生？它真的会影响我们的生活吗？了解水星掌管的生活领域，学习如何减少沟通混乱，将逆行能量转化为成长机会。',
        sections: [
          { type: 'p', text: '在占星学圈子里，没有什么话题比水星逆行更受关注了。邮件发错对象、电脑突然崩溃、前任莫名其妙出现……这些令人头疼的状况据说都与水星逆行有关。但水星逆行究竟是什么？它真的在影响我们的日常生活吗？让我们从天文学和占星学两个角度来深入了解这个神秘现象。' },
          { type: 'h2', text: '水星逆行的天文学原理' },
          { type: 'p', text: '首先要澄清一个误解：水星逆行并不是水星真的向后运动，而是一种视觉错觉。地球和水星都在绕太阳公转，但它们的轨道速度不同。水星的公转周期约为88天，而地球是365天。当地球在轨道上"追上"并超过水星时，从地球的视角看，水星就像是在向后移动。这就好比在高速公路上，当你乘坐的火车超过旁边较慢的列车时，那列慢车看起来好像在倒退一样。' },
          { type: 'h2', text: '水星在占星学中掌管哪些领域' },
          { type: 'p', text: '在占星学中，水星是掌管沟通、思维、短途旅行、技术和信息处理的行星。水星逆行期间，这些领域可能会出现混乱和延误，这也是为什么这段时期常常与各种沟通误解和技术故障联系在一起。了解水星的管辖范围，有助于我们预判可能出现的挑战。' },
          { type: 'ul', items: [
            '沟通：电子邮件误发、对话产生误解、合同条款出错',
            '技术设备：电脑蓝屏、手机丢失、各种电子设备出现故障',
            '旅行交通：航班取消、迷路、预订出现差错或延误',
            '过去重现：老朋友或前任突然联系、旧项目需要重新审视'
          ]},
          { type: 'h2', text: '如何聪明地度过水星逆行' },
          { type: 'p', text: '与其将水星逆行视为噩梦，不如把它看作一段特别的"回顾整理期"。水星逆行期间特别适合所有以"重新"开头的活动：重新反思（reflect）、重新审视（review）、重新修正（revise）、重新连接（reconnect）。这是整理过去、修复未完成事项的绝佳时机。' },
          { type: 'ul', items: [
            '尽量避免在此期间签署新合同、进行重大采购或作出重要决定',
            '发送重要邮件或消息前务必仔细检查，确认接收人和内容无误',
            '旅行计划要预留充裕时间，并制定备用方案以应对突发情况',
            '利用这段时间回顾正在进行的项目，找出并纠正潜在错误',
            '与久违的老友重新联系，或借此机会化解过去的遗留问题'
          ]},
          { type: 'h2', text: '水星逆行对不同星座的影响有何差异' },
          { type: 'p', text: '由于水星逆行发生在特定的星座区间，与该区间相同或相关元素的星座往往会感受到更强烈的影响。其中，双子座和处女座以水星为守护行星，因此在水星逆行期间通常是最敏感的两个星座。他们可能会比其他星座更明显地感受到沟通障碍和思维混乱。' },
          { type: 'h2', text: '水星逆行的频率与持续时间' },
          { type: 'p', text: '水星逆行每年发生3至4次，每次持续约3周。全年累计约有19%的时间处于水星逆行状态。重要的是，我们不必对这段时期感到恐慌或焦虑。只要提前了解、合理规划，水星逆行完全可以成为一段宝贵的内省整理时光，帮助我们清除障碍、为下一个前进周期积蓄能量。' },
          { type: 'quote', text: '"水星逆行不是诅咒，而是宇宙给予我们停下来回顾的礼物。"' },
        ],
      },
      ja: {
        title: '水星逆行とは：パニックにならず賢く乗り越えるための完全ガイド',
        excerpt: '水星逆行はなぜ起こり、私たちの生活にどう影響するのか？天文学的な仕組みから、コミュニケーションの混乱を最小化し逆行エネルギーを活かす実践的な方法まで詳しく解説します。',
        sections: [
          { type: 'p', text: '占星術の世界で、水星逆行ほど話題になる現象はないでしょう。メールの誤送信、パソコンの突然のクラッシュ、音信不通だった元恋人からの連絡……これらはすべて水星逆行のせいだと言われています。しかし実際のところ、水星逆行とは何なのでしょうか？そして本当に私たちの日常生活に影響を与えているのでしょうか？天文学と占星術の両面から詳しく見ていきましょう。' },
          { type: 'h2', text: '水星逆行の天文学的な仕組み' },
          { type: 'p', text: 'まず大切な誤解を解いておきましょう。水星逆行とは、水星が実際に逆方向へ動くわけではありません。これは視覚的な錯覚です。地球と水星はどちらも太陽の周りを公転していますが、その速度が異なります。水星の公転周期は約88日で、地球の365日より大幅に短いため、地球が水星を「追い越す」瞬間に、地球から見た水星が後退しているように見えるのです。高速道路で、自分の乗る電車が隣の遅い電車を追い越すとき、隣の電車が後ろに下がっているように見えるのと同じ原理です。' },
          { type: 'h2', text: '水星が司る生活領域' },
          { type: 'p', text: '占星術において水星は、コミュニケーション、思考、短距離旅行、テクノロジー、契約書類、情報処理を司る惑星です。水星逆行の期間中は、これらの分野で混乱や遅延が生じやすいと解釈されています。水星が管轄する範囲を把握しておくことで、この時期に起こりうる課題を事前に予測し、対策を取ることができます。' },
          { type: 'ul', items: [
            'コミュニケーション：メールの誤送信、会話での誤解、契約書のミス',
            'テクノロジー：パソコンのフリーズ、スマートフォンの紛失、電子機器のトラブル',
            '旅行・交通：フライトのキャンセル、道に迷う、予約ミスや遅延',
            '過去との再会：旧友や元恋人からの連絡、過去のプロジェクトの見直し'
          ]},
          { type: 'h2', text: '水星逆行を賢く乗り越える方法' },
          { type: 'p', text: '水星逆行を恐れる必要はありません。むしろ、この時期は「振り返りと整理」のための特別な期間として活用できます。「re-」（再び）から始まるすべての活動——振り返り（reflect）、見直し（review）、修正（revise）、再接続（reconnect）——に特に適した時期です。過去を整理し、未完了の事柄を片付けるのに絶好の機会といえるでしょう。' },
          { type: 'ul', items: [
            '新しい契約の締結や大きな買い物、重要な決断はできる限り後回しにする',
            '重要なメールやメッセージは送信前に必ず内容と宛先を再確認する',
            '旅行の計画には余裕を持たせ、トラブルに備えた代替プランを用意する',
            'この機会に進行中のプロジェクトを丁寧に見直し、ミスや抜け漏れを修正する',
            '長らく連絡を取っていた旧友と再会したり、過去の未解決の問題を整理する'
          ]},
          { type: 'h2', text: '星座によって影響の受け方は違うのか' },
          { type: 'p', text: '水星逆行は特定の星座の区間で起こるため、その区間と同じ、または関連する元素を持つ星座がより強い影響を受けることがあります。なかでも双子座と乙女座は水星を守護惑星として持っているため、水星逆行の影響を特に敏感に感じやすい傾向があります。この時期、双子座や乙女座の人々はコミュニケーションの誤解や思考の混乱により注意を払うと良いでしょう。' },
          { type: 'h2', text: '水星逆行の頻度と持続期間' },
          { type: 'p', text: '水星逆行は年に3〜4回、それぞれ約3週間にわたって発生します。年間の約19%の時間が水星逆行期間にあたります。この数字を見ると、水星逆行はそれほど珍しいことではないとわかります。大切なのは、事前にその時期を把握し、行動を適切に調整することです。恐れるのではなく、宇宙から与えられた「立ち止まって振り返る時間」として活用することが、最も賢い対処法といえるでしょう。' },
          { type: 'quote', text: '"水星逆行は呪いではなく、立ち止まって過去を整理するための宇宙からの贈り物だ。"' },
        ],
      },
      es: {
        title: 'Mercurio Retrógrado Explicado: Guía Completa para Navegar Este Evento Cósmico Sin Pánico',
        excerpt: '¿Por qué ocurre Mercurio retrógrado y qué aspectos de la vida afecta realmente? Desde la explicación astronómica hasta estrategias prácticas para minimizar el caos y aprovechar su energía transformadora.',
        sections: [
          { type: 'p', text: 'Pocos eventos astrológicos generan tanto revuelo como Mercurio retrógrado. Correos enviados a la persona equivocada, computadoras que fallan sin previo aviso, y ex parejas que reaparecen misteriosamente... Todo esto se atribuye a este fenómeno cósmico. Pero, ¿qué es realmente Mercurio retrógrado? ¿Y de verdad influye en nuestras vidas cotidianas? Vamos a explorarlo desde la astronomía y la astrología para entender qué está pasando realmente en el cielo.' },
          { type: 'h2', text: 'La Explicación Astronómica' },
          { type: 'p', text: 'Primero, aclaremos un malentendido fundamental: el movimiento retrógrado de Mercurio no significa que el planeta se mueva literalmente hacia atrás. Es una ilusión óptica. Tanto la Tierra como Mercurio orbitan alrededor del Sol, pero a velocidades diferentes. El período orbital de Mercurio es de aproximadamente 88 días, mucho más corto que los 365 días de la Tierra. Cuando la Tierra "alcanza" y sobrepasa a Mercurio en sus órbitas respectivas, desde nuestra perspectiva, Mercurio parece retroceder. Imagina estar en un tren que adelanta a otro más lento: el tren lento parece moverse hacia atrás aunque en realidad avanza.' },
          { type: 'h2', text: 'Áreas de la Vida que Rige Mercurio' },
          { type: 'p', text: 'En astrología, Mercurio es el planeta que gobierna la comunicación, el pensamiento racional, los viajes cortos, la tecnología, los contratos y el procesamiento de información. Durante su período retrógrado, se cree que estas áreas experimentan mayor confusión, retrasos y malentendidos. Conocer el dominio de Mercurio nos ayuda a anticipar los desafíos que pueden surgir durante este período y tomar medidas preventivas.' },
          { type: 'ul', items: [
            'Comunicación: correos electrónicos enviados por error, malentendidos en conversaciones, errores en contratos importantes',
            'Tecnología: ordenadores que se bloquean, pérdida de teléfonos, fallos inesperados en dispositivos electrónicos',
            'Viajes y transporte: vuelos cancelados, perderse, errores en reservas o retrasos imprevistos',
            'El pasado regresa: contacto de viejos amigos o ex parejas, revisión de proyectos anteriores sin terminar'
          ]},
          { type: 'h2', text: 'Cómo Navegar Mercurio Retrógrado con Inteligencia' },
          { type: 'p', text: 'En lugar de temer Mercurio retrógrado, podemos verlo como un valioso período de revisión y consolidación. Este tránsito es especialmente favorable para todas las actividades que comienzan con "re-": reflexionar, revisar, repasar, reconectar y reevaluar. Es el momento perfecto para limpiar el camino antes de avanzar, no para forzar nuevos comienzos.' },
          { type: 'ul', items: [
            'Posponer la firma de nuevos contratos, compras importantes o decisiones de gran impacto si es posible',
            'Revisar cuidadosamente correos electrónicos y mensajes antes de enviarlos, comprobando destinatarios y contenido',
            'Añadir tiempo extra a los planes de viaje y preparar alternativas ante posibles contratiempos',
            'Aprovechar para revisar proyectos en curso, detectar errores y corregir inconsistencias',
            'Retomar contacto con personas del pasado o resolver situaciones inconclusas que han quedado pendientes'
          ]},
          { type: 'h2', text: '¿Afecta Igual a Todos los Signos?' },
          { type: 'p', text: 'El impacto de Mercurio retrógrado varía según el signo del zodíaco. Como Mercurio es el planeta regente de Géminis y Virgo, estos dos signos tienden a sentir su influencia con mayor intensidad durante el período retrógrado. Pueden experimentar mayor confusión mental, dificultades para comunicarse con claridad y una sensación de que las cosas no fluyen con normalidad. Los signos donde ocurre el retrógrado también quedan especialmente afectados.' },
          { type: 'h2', text: 'Frecuencia y Duración del Fenómeno' },
          { type: 'p', text: 'Mercurio retrógrado ocurre entre tres y cuatro veces por año, con una duración de aproximadamente tres semanas cada vez. Esto significa que alrededor del 19% del año está bajo la influencia de este tránsito. Lejos de ser un evento excepcional, es una parte regular del ciclo cósmico anual. La clave está en conocer las fechas con anticipación y ajustar nuestras acciones de manera consciente. Cuando se aborda con sabiduría, Mercurio retrógrado se convierte en una oportunidad única para la introspección, la consolidación y la renovación personal.' },
          { type: 'quote', text: '"Mercurio retrógrado no es una maldición; es la invitación del universo a detenernos y mirar hacia atrás antes de seguir avanzando."' },
        ],
      },
    },
  },
  // article 2: moon-phases-and-astrology (with expanded ZH/JA/ES)
  {
    slug: 'moon-phases-and-astrology',
    category: 'basics',
    publishedAt: '2025-12-15',
    readingTime: 6,
    content: {
      ko: {
        title: '달의 위상과 별자리 운세: 신월부터 보름달까지 달이 우리에게 미치는 영향',
        excerpt: '신월, 상현달, 보름달, 하현달. 달의 네 가지 위상이 감정, 에너지, 별자리별 운세에 어떤 영향을 미치는지 알아보고, 달의 사이클을 일상에 활용하는 방법을 배웁니다.',
        sections: [
          { type: 'p', text: '인류는 달이 생기기 전부터 달을 바라보며 시간을 측정하고, 계절을 읽고, 삶의 리듬을 찾았습니다. 조수간만의 차를 통해 달이 물에 영향을 미친다는 것은 과학적으로 증명된 사실이며, 인체의 70%가 물로 이루어진 우리 역시 달의 영향권 아래 있다는 것이 점성술의 시각입니다.' },
          { type: 'h2', text: '🌑 신월(New Moon): 새로운 시작의 에너지' },
          { type: 'p', text: '신월은 달이 태양과 같은 방향에 있어 지구에서 보이지 않는 상태입니다. 점성술에서 신월은 새로운 사이클의 시작, 씨앗을 심는 시간을 의미합니다. 이 시기는 새로운 프로젝트를 시작하거나, 목표를 설정하거나, 새로운 습관을 만들기에 이상적입니다.' },
          { type: 'ul', items: [
            '신월에 적합한 활동: 목표 설정, 새 프로젝트 시작, 명상, 의도 선언',
            '신월의 에너지: 내향적, 성찰적, 잠재적 에너지',
            '지속 기간: 약 2.5일간 신월 에너지가 지속됨'
          ]},
          { type: 'h2', text: '🌓 상현달(Waxing Moon): 성장과 행동의 에너지' },
          { type: 'p', text: '신월에서 보름달로 가는 과정에서 달은 점점 밝아집니다. 이 상현달 기간은 행동하고, 추진력을 얻고, 목표를 향해 나아가기에 좋은 시기입니다. 에너지가 점점 고조되며 외향적인 활동들이 더 잘 이루어집니다.' },
          { type: 'h2', text: '🌕 보름달(Full Moon): 절정과 완성의 에너지' },
          { type: 'p', text: '보름달은 달의 사이클에서 가장 강력한 에너지를 발산하는 시기입니다. 감정이 고조되고, 무의식에 숨어있던 것들이 표면으로 드러나는 시기이기도 합니다. 보름달은 신월로부터 약 2주 후에 반대편 별자리에 뜹니다. 예를 들어 태양이 양자리에 있을 때 보름달은 천칭자리에 뜹니다.' },
          { type: 'ul', items: [
            '보름달에 적합한 활동: 축하, 마무리, 감사, 방출(놓아주기)',
            '보름달의 에너지: 강렬, 감정적, 계시적',
            '경고: 감정적으로 예민해질 수 있으므로 중요한 결정은 신중하게'
          ]},
          { type: 'h2', text: '🌗 하현달(Waning Moon): 정리와 완성의 에너지' },
          { type: 'p', text: '보름달에서 신월로 가는 하현달 기간은 정리, 해방, 완성의 시기입니다. 더 이상 필요하지 않은 것들을 놓아주고, 해묵은 감정을 처리하고, 공간을 만드는 데 좋은 시기입니다.' },
          { type: 'h2', text: '별자리별 달의 영향' },
          { type: 'p', text: '달이 어떤 별자리를 통과하느냐에 따라 그 달의 에너지가 달라집니다. 달은 약 2.5일마다 별자리를 바꾸며, 한 달에 모든 12별자리를 차례로 거칩니다. 달이 당신의 태양 별자리나 달 별자리를 통과할 때는 더욱 활발하고 감성적인 에너지를 경험할 수 있습니다.' },
          { type: 'p', text: '달의 사이클을 일상에 통합하는 것은 내면의 리듬을 자연의 흐름과 맞추는 실천입니다. 신월에 새로운 의도를 설정하고, 보름달에 그 성과를 점검하고 축하하며, 하현달에 불필요한 것을 정리하는 루틴을 만들어보세요.' },
        ],
      },
      en: {
        title: 'Moon Phases and Astrology: How the Lunar Cycle Influences Your Energy and Emotions',
        excerpt: 'New Moon, Waxing Moon, Full Moon, Waning Moon — discover how each lunar phase affects your emotions, energy, and daily fortune, and how to align your life with the moon\'s rhythm.',
        sections: [
          { type: 'p', text: 'Humanity has looked to the moon for timekeeping and rhythm since before recorded history. The moon\'s gravitational pull visibly affects Earth\'s oceans, and astrology holds that it similarly influences us — given that our bodies are roughly 70% water.' },
          { type: 'h2', text: '🌑 New Moon: Energy of New Beginnings' },
          { type: 'p', text: 'When the Moon aligns with the Sun (making it invisible from Earth), a new lunar cycle begins. In astrology, the New Moon is a time for planting seeds — setting intentions, beginning new projects, and forming new habits. Its energy is inward and potential-rich.' },
          { type: 'ul', items: [
            'Ideal activities: goal setting, starting new projects, meditation, intention setting',
            'Energy quality: introspective, receptive, full of potential',
            'Duration: the new moon energy peaks for about 2-3 days'
          ]},
          { type: 'h2', text: '🌓 Waxing Moon: Energy of Growth and Action' },
          { type: 'p', text: 'As the Moon grows brighter between New and Full phases, energy builds outward. This is an excellent time for taking action, building momentum, and making progress toward goals. Social activities and outward expression flow more easily.' },
          { type: 'h2', text: '🌕 Full Moon: Energy of Culmination and Release' },
          { type: 'p', text: 'The Full Moon occurs roughly two weeks after the New Moon, in the opposite zodiac sign. It\'s the cycle\'s peak intensity — emotions run high and unconscious patterns may surface. Full Moons are perfect for celebration, completion, gratitude, and conscious release of what no longer serves.' },
          { type: 'ul', items: [
            'Ideal activities: celebration, completion rituals, expressing gratitude, releasing what no longer serves',
            'Energy quality: intense, emotional, illuminating',
            'Caution: heightened emotions may require extra mindfulness in important decisions'
          ]},
          { type: 'h2', text: '🌗 Waning Moon: Energy of Clearing and Completion' },
          { type: 'p', text: 'Between Full Moon and the next New Moon, energy gradually withdraws inward. This is the ideal period for letting go, processing emotions, clearing clutter (physical and emotional), and completing unfinished business.' },
          { type: 'h2', text: 'The Moon Through Each Sign' },
          { type: 'p', text: 'The Moon changes zodiac signs every 2.5 days, cycling through all 12 signs monthly. When the Moon transits your Sun sign or Moon sign, you may notice heightened emotional sensitivity and more vivid energy. Aligning with the lunar cycle — setting intentions at New Moon, celebrating at Full Moon, releasing at Waning Moon — is one of the most accessible ways to live in rhythm with natural cycles.' },
        ],
      },
      zh: {
        title: '月相与占星：从新月到满月，月亮如何深刻影响我们的情绪、能量与运势',
        excerpt: '新月、上弦月、满月、下弦月——深入了解每个月相背后的能量特质，学习如何将生活节律与月亮周期对齐，让自然的智慧成为你日常决策的指引。',
        sections: [
          { type: 'p', text: '人类从史前时代就开始仰望月亮，用它来计时、感知季节更替，并从中寻找生命的节律。月亮对地球海洋的潮汐影响是有充分科学依据的事实，而占星学进一步认为，由于人体约70%由水构成，月亮的引力和能量变化同样会对我们的情绪和身体状态产生微妙而深刻的影响。了解月亮的四个主要位相，能帮助我们更好地与自然节律共振，做出更明智的生活选择。' },
          { type: 'h2', text: '🌑 新月：播种与新开始的能量' },
          { type: 'p', text: '新月出现在月亮与太阳运行到同一方向时，从地球上几乎看不见月亮，象征着一个全新周期的诞生。在占星学中，新月代表播种的时刻——这是设定意图、启动新项目、建立新习惯的最佳时机。新月的能量是内敛而充满可能性的，就像一颗蓄势待发的种子，拥有无限的生长潜力。' },
          { type: 'ul', items: [
            '最适合的活动：制定目标、启动新项目、冥想静心、写下心愿与意图',
            '能量特质：内省、接纳、充满潜力，适合向内探索',
            '持续时间：新月能量在月相变化后约2至3天内最为强烈'
          ]},
          { type: 'h2', text: '🌓 上弦月：成长与行动的能量' },
          { type: 'p', text: '从新月到满月的过渡阶段，月亮逐渐变亮，能量也随之向外扩展。这个上弦月时期是采取行动、积累动力、推进目标的绝佳窗口。此时精力充沛，外向型活动——如社交、拓展人脉、推进项目——都更容易取得进展。就像植物在阳光照射下快速生长，上弦月的能量支持我们积极地向外探索和表达。' },
          { type: 'h2', text: '🌕 满月：顶点、完成与释放的能量' },
          { type: 'p', text: '满月发生在新月后约两周，出现在黄道对面的星座上。这是整个月亮周期中能量最为强烈的时刻——情绪容易高涨，潜意识中隐藏的模式和感受可能浮出水面。满月是庆祝成就、完成旧有循环、表达感恩，以及有意识地放下那些已不再服务于你的事物的理想时机。' },
          { type: 'ul', items: [
            '最适合的活动：庆祝成果、完成仪式、深表感恩、有意识地放手',
            '能量特质：强烈、情绪化、具有启示性，适合情感释放与感悟',
            '注意事项：情绪敏感度提高，重大决定应更加审慎，避免冲动行事'
          ]},
          { type: 'h2', text: '🌗 下弦月：整理、净化与完成的能量' },
          { type: 'p', text: '从满月到下一个新月的下弦月阶段，月亮逐渐隐去，能量也随之向内收敛。这是整理、净化、放手的理想时期。适合清理积压已久的情绪包袱、整理物理和心理空间、完成尚未了结的事项。下弦月的智慧在于"减法"——放下那些不再需要的，为新月的到来腾出空间。' },
          { type: 'h2', text: '月亮经过不同星座时的影响' },
          { type: 'p', text: '月亮大约每2.5天换一个星座，每月依次经历全部12个星座。当月亮经过你的太阳星座或本命月亮星座时，你可能会感受到更强烈的情绪波动和能量变化。这是因为月亮的能量与你出生图中的关键位置产生了共鸣，让内心世界更加活跃和敏感。' },
          { type: 'h2', text: '将月亮节律融入日常生活' },
          { type: 'p', text: '将生活与月亮周期对齐，是一种简单却深刻的自我关怀实践。建议从新月开始设定月度意图，在上弦月积极推进，在满月庆祝进展并审视需要放下的事物，最后在下弦月进行整理和反思。这样的月度节律，能帮助你与自然的智慧保持同步，让生活更加流畅而有意义。' },
          { type: 'quote', text: '"与月亮共舞，不是迷信，而是与宇宙最古老的节律重新连接。"' },
        ],
      },
      ja: {
        title: '月相と占星術：新月から満月まで、月が感情・エネルギー・運勢に与える深い影響',
        excerpt: '新月、上弦の月、満月、下弦の月。月の四つの位相が持つエネルギーの特質を深く理解し、月のリズムに合わせた生活実践で自然の知恵を日常に活かす方法を詳しく解説します。',
        sections: [
          { type: 'p', text: '人類は有史以前から月を見上げ、時を測り、季節の移り変わりを感じ、生命のリズムを探してきました。月の引力が地球の海に潮の満ち引きをもたらすことは科学的に証明された事実であり、占星術では人体の約70%が水で構成されていることから、月のエネルギーの変化が私たちの感情や身体状態にも微妙かつ深い影響を与えると考えます。月の四つの主要な位相を理解することで、自然のリズムとより調和した生活を送ることができるでしょう。' },
          { type: 'h2', text: '🌑 新月：種まきと新たな始まりのエネルギー' },
          { type: 'p', text: '新月は月と太陽が同じ方向に位置し、地球からほぼ見えない状態です。これは新しいサイクルの誕生を象徴し、占星術では「種を蒔く時間」として解釈されます。新しいプロジェクトを始めたり、目標を設定したり、新しい習慣を形成するのに最も適した時期です。新月のエネルギーは内向きで可能性に満ちており、発芽を待つ種のように、膨大な潜在力を秘めています。' },
          { type: 'ul', items: [
            '最適な活動：目標設定、新プロジェクトの開始、瞑想、インテンション（意図）の宣言',
            'エネルギーの質：内省的、受容的、可能性に満ちた状態。内なる世界の探索に向く',
            '持続時間：新月エネルギーは月相が変わってから約2〜3日間、特に強く続く'
          ]},
          { type: 'h2', text: '🌓 上弦の月：成長と行動のエネルギー' },
          { type: 'p', text: '新月から満月へと向かう上弦の月の時期、月は徐々に明るさを増し、エネルギーは外向きに広がっていきます。この期間は行動を起こし、勢いをつけ、目標に向かって前進するのに最適です。社交活動や対外的な表現もこの時期に活発になりやすく、植物が太陽の光を受けてぐんぐん育つように、私たちのエネルギーも積極的な外向きの探索と表現を支えます。' },
          { type: 'h2', text: '🌕 満月：頂点・完成・解放のエネルギー' },
          { type: 'p', text: '満月は新月から約2週間後、反対の星座に現れます。これは月のサイクル全体でエネルギーが最も高まる瞬間であり、感情が高ぶり、無意識に抑圧されていたパターンや感情が表面に浮かび上がりやすい時期でもあります。満月は達成を祝い、古いサイクルを完結させ、感謝を表し、もはや自分の役に立たなくなったものを意識的に手放すのに最適な時です。' },
          { type: 'ul', items: [
            '最適な活動：成果の祝福、完了の儀式、深い感謝の表明、意識的な手放し',
            'エネルギーの質：強烈、感情的、啓示的。感情の解放と洞察に向く',
            '注意点：感情の敏感さが高まるため、重要な決断はより慎重に行うこと'
          ]},
          { type: 'h2', text: '🌗 下弦の月：整理・浄化・完成のエネルギー' },
          { type: 'p', text: '満月から次の新月へと向かう下弦の月の時期、月は徐々に欠けていき、エネルギーも内向きに収縮していきます。この段階は整理、浄化、手放しのための理想的な期間です。長い間抱えてきた感情的な荷物を処理し、物理的・精神的な空間を整え、未完了の事柄を完結させるのに適しています。下弦の月の知恵は「引き算」にあります——不要なものを手放すことで、次の新月のために新鮮なスペースを作り出します。' },
          { type: 'h2', text: '月が各星座を通過する際の影響' },
          { type: 'p', text: '月は約2.5日ごとに星座を移り変わり、毎月すべての12星座を順に巡ります。月があなたの太陽星座や出生時の月星座を通過する時、より強い感情の揺れや鮮明なエネルギーの変化を感じることがあるかもしれません。これは、月のエネルギーがあなたのネイタルチャートの重要な位置と共鳴し、内なる世界をより活性化させるためです。' },
          { type: 'h2', text: '月のリズムを日常生活に取り入れる' },
          { type: 'p', text: '月のサイクルに合わせて生活することは、シンプルでありながら深い自己ケアの実践です。新月に月間のインテンションを設定し、上弦の月に積極的に行動し、満月に進捗を祝いながら手放すべきものを見直し、下弦の月に整理と内省を行う——このような月のリズムに沿った習慣が、自然の知恵と調和した、より意味深い生活へと導いてくれます。' },
          { type: 'quote', text: '"月と踊ることは迷信ではなく、宇宙で最も古いリズムと再びつながることだ。"' },
        ],
      },
      es: {
        title: 'Fases de la Luna y Astrología: Cómo el Ciclo Lunar Moldea Tu Energía, Emociones y Destino',
        excerpt: 'Luna Nueva, Luna Creciente, Luna Llena, Luna Menguante — comprende en profundidad la energía de cada fase lunar y aprende a alinear tu vida con el ritmo más antiguo de la naturaleza para tomar decisiones más sabias cada día.',
        sections: [
          { type: 'p', text: 'La humanidad ha mirado a la luna desde antes de que existiera la escritura, usándola para medir el tiempo, sentir el cambio de estaciones y encontrar el ritmo de la vida. La influencia gravitacional de la luna sobre los océanos de la Tierra es un hecho científicamente documentado, y la astrología sostiene que, dado que nuestro cuerpo está compuesto aproximadamente en un 70% de agua, los cambios en la energía lunar también afectan nuestras emociones y estados físicos de maneras sutiles pero profundas. Comprender las cuatro fases principales de la luna nos permite vivir en mayor armonía con los ritmos naturales.' },
          { type: 'h2', text: '🌑 Luna Nueva: Energía de Siembra y Nuevos Comienzos' },
          { type: 'p', text: 'La Luna Nueva ocurre cuando la Luna se alinea con el Sol y es prácticamente invisible desde la Tierra. Simboliza el nacimiento de un nuevo ciclo y, en astrología, representa el momento de plantar semillas: es el tiempo ideal para establecer intenciones, iniciar proyectos, formar nuevos hábitos y dar forma a los deseos que queremos cultivar. Su energía es introvertida y plena de potencial, como una semilla que contiene en su interior la promesa de un árbol completo.' },
          { type: 'ul', items: [
            'Actividades ideales: establecer metas, iniciar proyectos, meditación, escribir intenciones y deseos',
            'Calidad de energía: introspectiva, receptiva, llena de posibilidades; ideal para explorar el mundo interior',
            'Duración: la energía de luna nueva alcanza su pico durante aproximadamente 2 a 3 días'
          ]},
          { type: 'h2', text: '🌓 Luna Creciente: Energía de Crecimiento y Acción' },
          { type: 'p', text: 'En el período que va de la Luna Nueva a la Luna Llena, la luna se vuelve progresivamente más brillante y la energía se expande hacia el exterior. Esta fase creciente es el momento perfecto para pasar a la acción, ganar impulso y avanzar activamente hacia los objetivos fijados durante la luna nueva. Las actividades sociales, la expansión de redes y el trabajo externo fluyen con mayor facilidad. Al igual que las plantas que crecen aceleradamente bajo la luz del sol, nuestra energía también está diseñada para explorar y expresarse hacia afuera durante esta fase.' },
          { type: 'h2', text: '🌕 Luna Llena: Energía de Culminación, Revelación y Liberación' },
          { type: 'p', text: 'La Luna Llena tiene lugar aproximadamente dos semanas después de la Luna Nueva, en el signo zodiacal opuesto. Este es el momento de mayor intensidad energética del ciclo lunar: las emociones se elevan, los patrones inconscientes pueden emerger con claridad, y lo que estaba oculto tiende a salir a la luz. La Luna Llena es ideal para celebrar los logros conseguidos, completar ciclos, expresar gratitud profunda y liberar conscientemente aquello que ya no nos sirve o nos limita.' },
          { type: 'ul', items: [
            'Actividades ideales: celebración de logros, rituales de cierre, gratitud profunda, liberación consciente',
            'Calidad de energía: intensa, emocional, iluminadora; propicia para la revelación y la catarsis emocional',
            'Precaución: la mayor sensibilidad emocional requiere especial atención al tomar decisiones importantes'
          ]},
          { type: 'h2', text: '🌗 Luna Menguante: Energía de Limpieza, Integración y Cierre' },
          { type: 'p', text: 'Desde la Luna Llena hasta la próxima Luna Nueva, la luna mengua gradualmente y la energía se retira hacia el interior. Esta fase es el período ideal para soltar, limpiar y completar. Permite procesar cargas emocionales acumuladas, ordenar espacios físicos y mentales, y terminar asuntos pendientes. La sabiduría de la luna menguante reside en la "sustracción": al desprenderse de lo que ya no es necesario, creamos el espacio necesario para que algo nuevo pueda nacer en la próxima luna nueva.' },
          { type: 'h2', text: 'La Luna a Través de Cada Signo del Zodíaco' },
          { type: 'p', text: 'La Luna cambia de signo zodiacal aproximadamente cada 2.5 días, recorriendo los 12 signos completos cada mes. Cuando la luna transita tu signo solar o tu signo lunar natal, es probable que experimentes una mayor sensibilidad emocional y una percepción más vívida de tu energía interna. Esto ocurre porque la luna activa los puntos más significativos de tu carta natal, despertando el mundo interior con especial intensidad.' },
          { type: 'h2', text: 'Integrar el Ritmo Lunar en la Vida Cotidiana' },
          { type: 'p', text: 'Alinear tu vida con el ciclo lunar es una práctica de autocuidado sencilla pero profundamente transformadora. El proceso es simple: establece intenciones mensuales en la Luna Nueva, toma acción durante la Luna Creciente, celebra los avances y examina qué soltar en la Luna Llena, y finaliza con un período de integración y limpieza durante la Luna Menguante. Este ritmo mensual, en sintonía con la sabiduría de la naturaleza, puede hacer que tu vida fluya con mayor sentido, equilibrio y propósito.' },
          { type: 'quote', text: '"Bailar con la luna no es superstición; es reconectar con el ritmo más antiguo del universo."' },
        ],
      },
    },
  },
  // article 3: how-to-read-your-horoscope (with expanded ZH/JA/ES)
  {
    slug: 'how-to-read-your-horoscope',
    category: 'basics',
    publishedAt: '2025-12-20',
    readingTime: 5,
    content: {
      ko: {
        title: '운세 제대로 읽는 법: 일일·주간·월간 운세를 삶에 실질적으로 적용하는 방법',
        excerpt: '단순히 "오늘은 좋다, 나쁘다"를 넘어, 운세를 깊이 이해하고 삶에 현명하게 적용하는 방법을 알아봅니다. 5개 카테고리(종합·연애·직장·건강·금전) 운세를 읽는 실용 가이드입니다.',
        sections: [
          { type: 'p', text: '운세를 보는 것은 단순한 오락을 넘어 자기 인식의 도구가 될 수 있습니다. 하지만 많은 사람들이 "오늘은 사랑 운이 좋네!" 하고 넘어가거나, 반대로 "오늘은 안 좋다더라"며 하루 종일 걱정하기도 합니다. 운세를 보다 깊이 이해하고 실질적으로 활용하는 방법을 알아봅시다.' },
          { type: 'h2', text: '운세의 5개 카테고리 이해하기' },
          { type: 'ul', items: [
            '종합 운세: 그날의 전반적인 에너지와 흐름. 가장 기본적인 지표',
            '연애 운세: 감정적 연결, 인간관계, 낭만적 기회에 대한 안내',
            '직장 운세: 커리어, 창의성, 협업, 직업적 성공에 관한 지표',
            '건강 운세: 신체 에너지, 스트레스 수준, 자기 관리에 대한 주의사항',
            '금전 운세: 재정적 기회, 지출 충동, 투자 타이밍에 대한 안내'
          ]},
          { type: 'h2', text: '점수 체계 이해하기' },
          { type: 'p', text: '많은 운세 서비스에서 1-100점 또는 별점으로 운세를 표현합니다. 이 점수는 절대적인 기준이 아니라 상대적인 에너지 지표입니다. 60점짜리 날이 반드시 나쁜 날은 아닙니다. 40점이라도 그 의미를 이해하고 대응하면 충분히 좋은 하루를 만들 수 있습니다.' },
          { type: 'h2', text: '운세를 삶에 실질적으로 적용하는 3단계' },
          { type: 'ul', items: [
            '1단계 - 맥락 파악: 오늘 어떤 별자리 에너지가 강한지 확인하고, 내 상황에 적용',
            '2단계 - 의도 설정: 좋은 운세는 적극적으로 활용하고, 주의 사항은 미리 대비',
            '3단계 - 저녁 성찰: 하루가 끝날 때 아침에 읽은 운세와 실제 경험을 비교해보기'
          ]},
          { type: 'h2', text: '일별 vs 주간 vs 월간 운세의 차이' },
          { type: 'p', text: '일일 운세는 그날의 구체적인 행성 위치를 기반으로 합니다. 주간 운세는 더 큰 트렌드와 테마를 포착하며, 월간 운세는 한 달 전체의 주요 사이클과 기회를 보여줍니다. 세 가지를 함께 활용하면 단기와 장기적 관점을 균형 있게 가질 수 있습니다.' },
          { type: 'h2', text: '운세가 "맞지 않을" 때' },
          { type: 'p', text: '운세가 내 경험과 다르게 느껴질 때가 있습니다. 이는 자연스러운 현상입니다. 대중적인 일일 운세는 특정 별자리의 수백만 명을 위한 일반적인 안내입니다. 당신의 달 별자리, 상승궁, 현재 진행 중인 개인적 상황에 따라 같은 별자리라도 매우 다른 경험을 할 수 있습니다.' },
          { type: 'p', text: '운세를 현명하게 사용하는 핵심은 예언이 아닌 나침반으로 바라보는 것입니다. 완벽한 지도는 아니지만, 하루를 시작할 때 어떤 방향으로 에너지를 집중할지 생각해보는 유용한 안내판이 될 수 있습니다.' },
        ],
      },
      en: {
        title: 'How to Read Your Horoscope: A Practical Guide to Applying Daily Fortunes to Real Life',
        excerpt: 'Go beyond "today is good or bad" — learn how to deeply understand and meaningfully apply the five horoscope categories (overall, love, career, health, money) to your daily life.',
        sections: [
          { type: 'p', text: 'Reading a horoscope can be more than entertainment — it can be a genuine tool for self-awareness. But many people either brush it off with a quick "good day today!" or let an unfavorable reading cast a shadow over their entire day. Here\'s how to engage with horoscopes more deeply and practically.' },
          { type: 'h2', text: 'Understanding the Five Horoscope Categories' },
          { type: 'ul', items: [
            'Overall: The day\'s general energy and flow — your fundamental indicator',
            'Love: Emotional connection, relationships, romantic opportunities',
            'Career: Professional success, creativity, collaboration, ambition',
            'Health: Physical energy levels, stress indicators, self-care needs',
            'Money: Financial opportunities, spending impulses, investment timing'
          ]},
          { type: 'h2', text: 'Understanding Score Systems' },
          { type: 'p', text: 'Many horoscope services express readings as scores (1-100) or star ratings. These are relative energy indicators, not absolute judgments. A 60-point day isn\'t necessarily bad — understanding what that energy means and responding appropriately can make any day excellent.' },
          { type: 'h2', text: '3 Steps to Practically Apply Your Horoscope' },
          { type: 'ul', items: [
            'Step 1 — Context: Identify today\'s dominant energies and how they apply to your specific situation',
            'Step 2 — Intention: Amplify favorable energies with deliberate action; prepare for cautions proactively',
            'Step 3 — Evening review: Compare your morning reading to your actual experiences'
          ]},
          { type: 'h2', text: 'Daily vs. Weekly vs. Monthly Horoscopes' },
          { type: 'p', text: 'Daily horoscopes reflect specific planetary positions for that day. Weekly readings capture broader trends and themes. Monthly horoscopes reveal major cycles and opportunities for the entire month. Using all three together gives you both short-term detail and long-term perspective.' },
          { type: 'h2', text: 'When Horoscopes Don\'t Match Your Experience' },
          { type: 'p', text: 'Sometimes readings won\'t resonate — and that\'s completely normal. Mass daily horoscopes are generalized guidance for millions of people sharing the same Sun sign. Your Moon sign, Ascendant, and current personal circumstances can lead to very different experiences from someone else born under the same Sun sign.' },
          { type: 'p', text: 'The key to using horoscopes wisely is treating them as compasses, not GPS systems. They provide useful directional guidance without being perfect maps.' },
        ],
      },
      zh: {
        title: '如何正确解读运势：将每日、每周、每月星盘洞见切实运用于真实生活的完整指南',
        excerpt: '超越简单的"今天好或不好"——深入理解运势五大类别（综合、爱情、事业、健康、财运），掌握将星盘智慧转化为日常行动的三步法，让运势成为你最有价值的生活指南针。',
        sections: [
          { type: 'p', text: '阅读运势可以远不止是一种娱乐——它可以成为真正的自我认知工具。然而，很多人要么只是匆匆扫一眼就过去了，要么因为看到"不好"的运势就整天忧心忡忡。其实，运势的价值取决于你如何解读和运用它。学会深入理解并实际应用运势，才能让这份古老智慧真正服务于你的现代生活。' },
          { type: 'h2', text: '深入理解运势的五大类别' },
          { type: 'p', text: '完整的星座运势通常包含五个维度，每个维度都提供不同层面的洞见，帮助你全面把握当天的宇宙能量流向。理解每个类别的含义，是精准运用运势的第一步。' },
          { type: 'ul', items: [
            '综合运势：当天整体能量与流向，是所有类别中最基础的参考指标',
            '爱情运势：情感联结、人际关系动态以及浪漫机遇的能量指引',
            '事业运势：职业发展、创造力激发、团队协作与职场成功的天时信号',
            '健康运势：身体能量水平、压力状态及自我关怀需求的提示',
            '财运：财务机遇的窗口、消费冲动的警示以及投资时机的参考'
          ]},
          { type: 'h2', text: '正确理解运势评分系统' },
          { type: 'p', text: '许多运势服务使用1到100分或星级评分来表达当日运势。这些分数是相对的能量指标，而非绝对的好坏判断。一个60分的日子并不意味着这天会很糟糕；关键在于理解这个分数代表什么样的能量特质，然后做出相应的行动调整。即使是40分的日子，只要你了解其背后的含义并采取适当策略，同样可以过得充实有意义。' },
          { type: 'h2', text: '将运势切实运用于生活的三步法' },
          { type: 'p', text: '掌握了运势的基本框架之后，真正重要的是如何将这些信息转化为具体的行动指导。以下三个步骤能帮助你将星座洞见融入日常决策，让运势从纸面上的文字变成真实生活中的指引。' },
          { type: 'ul', items: [
            '第一步——把握背景：了解今日主导的星座能量特质，结合自身当前的实际情况进行个性化解读',
            '第二步——设定意图：积极利用运势中的有利能量主动行动，对于注意事项则提前做好心理和行动准备',
            '第三步——晚间复盘：一天结束时回顾早晨阅读的运势，与实际经历进行对比，逐渐培养对运势的个人感知'
          ]},
          { type: 'h2', text: '每日、每周与每月运势有何不同' },
          { type: 'p', text: '三种时间维度的运势各有侧重，配合使用效果最佳。每日运势反映当天具体的行星位置，适合指导当日的具体决策和行动；每周运势捕捉更宏观的趋势和主题，适合规划一周的工作和社交安排；每月运势则揭示整个月的重要周期和重大机遇，适合制定月度目标和长期计划。将三者结合，既能把握当下细节，又不失去长远视野。' },
          { type: 'h2', text: '当运势与你的实际体验不符时' },
          { type: 'p', text: '有时候运势的描述与你的实际感受不一致——这完全正常。面向大众的每日运势是为数百万拥有相同太阳星座的人提供的通用指引，无法考虑到每个人独特的出生图细节。你的月亮星座、上升星座以及当前的个人处境，都可能导致你的体验与同星座的他人截然不同。遇到运势"不准"的情况时，不必气馁或质疑运势的价值。' },
          { type: 'h2', text: '运势是指南针，不是GPS' },
          { type: 'p', text: '明智使用运势的核心在于将其视为方向指引，而非精确预言。运势不是能精确告诉你"今天下午三点会发生什么"的GPS导航系统，而更像是一个罗盘——它提供大致的方向感，帮助你以更有意识的姿态开始每一天。当你带着这种心态阅读运势时，它自然会成为促进自我成长和生活优化的有价值工具。' },
          { type: 'quote', text: '"运势不是命运的宣判，而是宇宙能量的天气预报——了解它，你就能更好地准备自己的每一天。"' },
        ],
      },
      ja: {
        title: '星占いの正しい読み方：毎日・毎週・毎月の運勢を実生活に活かすための実践的完全ガイド',
        excerpt: '単純な「今日は良い・悪い」を超えて、5つのカテゴリー（総合・恋愛・仕事・健康・金運）を深く理解し、星座の知恵を日常の具体的な行動に変換する3ステップ法を学びます。',
        sections: [
          { type: 'p', text: '星占いを読むことは、単なるエンターテインメントを超えた自己認識のツールになり得ます。しかし多くの人は、「今日は恋愛運が良いね！」とさらっと読み流すか、逆に「今日は悪い日だ」と朝から気分を暗くしてしまいます。星占いをより深く理解し、実生活に実際に役立てる方法を学ぶことで、この古代の知恵があなたの現代生活を豊かにする本当のガイドになります。' },
          { type: 'h2', text: '運勢の5つのカテゴリーを深く理解する' },
          { type: 'p', text: '完全な星座運勢は通常5つの次元を含んでおり、それぞれが異なる側面からその日の宇宙エネルギーの流れに関する洞察を提供します。各カテゴリーの意味を理解することが、運勢を精確に活用するための第一歩となります。' },
          { type: 'ul', items: [
            '総合運：その日の全体的なエネルギーと流れ。すべてのカテゴリーの中で最も基本的な参考指標',
            '恋愛運：感情的なつながり、人間関係の動向、ロマンチックな機会へのエネルギーガイド',
            '仕事運：キャリア発展、創造性の発揮、チームワーク、職業的成功への天の時のシグナル',
            '健康運：身体エネルギーレベル、ストレス状態、セルフケアのニーズへの注意喚起',
            '金運：財務的な機会の窓口、支出衝動への警告、投資タイミングの参考'
          ]},
          { type: 'h2', text: '運勢スコアシステムを正しく理解する' },
          { type: 'p', text: '多くの占いサービスでは、1〜100点や星評価で運勢を表現します。これらのスコアは絶対的な良し悪しの判断ではなく、相対的なエネルギー指標です。60点の日が必ずしも悪い日というわけではありません——そのエネルギーが何を意味するかを理解し、適切に対応することで、どんな日でも充実したものにできます。40点の日であっても、背景にある意味を把握して適切な戦略を取れば、十分に実りある一日を過ごすことができます。' },
          { type: 'h2', text: '運勢を実生活に活かす3ステップ法' },
          { type: 'p', text: '運勢の基本的な枠組みを理解したら、次に重要なのはその情報をどのように具体的な行動指針に変換するかです。以下の3つのステップが、星座の洞察を日常の意思決定に組み込み、占いを紙の上の文字から実際の生活の指針に変える助けになります。' },
          { type: 'ul', items: [
            'ステップ1——コンテキストの把握：今日の主要な星座エネルギーの特質を確認し、自分の現在の状況に当てはめて個別化した解釈を行う',
            'ステップ2——インテンションの設定：有利なエネルギーは積極的に行動で活かし、注意事項については事前に心理的・行動的な準備を整える',
            'ステップ3——夜の振り返り：一日の終わりに朝読んだ運勢と実際の体験を比べ、徐々に運勢への個人的な感受性を養う'
          ]},
          { type: 'h2', text: '毎日・毎週・毎月の運勢の違いと使い分け' },
          { type: 'p', text: '3つの時間軸の運勢はそれぞれ異なる焦点を持っており、組み合わせて使うことで最大の効果が得られます。毎日の運勢はその日固有の惑星配置を反映し、日々の具体的な決断や行動の指針として最適です。毎週の運勢はより大きなトレンドとテーマをとらえ、一週間の仕事や社交的な計画立案に向いています。毎月の運勢は月全体の重要なサイクルと主要な機会を明らかにし、月間目標の設定や長期計画に役立ちます。' },
          { type: 'h2', text: '占いが「外れる」と感じたとき' },
          { type: 'p', text: '運勢の内容が自分の実際の感覚と一致しないことがあります——これは完全に自然なことです。大衆向けの日々の星占いは、同じ太陽星座を持つ何百万人もの人々への汎用的なガイダンスであり、個人の出生図の詳細を反映することはできません。あなたの月星座、アセンダント、現在の個人的な状況によって、同じ星座でも全く異なる体験をする可能性があります。「外れた」と感じても、占いの価値を疑う必要はありません。' },
          { type: 'h2', text: '星占いはコンパス、GPSではない' },
          { type: 'p', text: '星占いを賢く活用する核心は、それを精確な予言ではなく方向性の指針として捉えることです。星占いは「今日の午後3時に何が起こるか」を正確に教えてくれるGPSナビゲーターではなく、むしろコンパスに近いものです——大まかな方向感を提供し、より意識的な姿勢で毎日を始める助けをしてくれます。このような心構えで占いを読むとき、それは自然と自己成長と生活の充実を促す貴重なツールになります。' },
          { type: 'quote', text: '"星占いは運命の宣告ではなく、宇宙エネルギーの天気予報だ——それを知れば、より賢く一日を準備できる。"' },
        ],
      },
      es: {
        title: 'Cómo Leer Tu Horóscopo: Guía Práctica Completa para Aplicar los Pronósticos Astrales a Tu Vida Real',
        excerpt: 'Ve mucho más allá del simple "hoy es bueno o malo" — aprende a comprender en profundidad las cinco categorías del horóscopo y domina el método de tres pasos para convertir la sabiduría estelar en acciones concretas y significativas cada día.',
        sections: [
          { type: 'p', text: 'Leer un horóscopo puede ser mucho más que una fuente de entretenimiento: puede convertirse en una herramienta genuina de autoconocimiento y toma de decisiones. Sin embargo, muchas personas o bien lo hojean rápidamente sin reflexionar, o bien dejan que una lectura desfavorable les ensombrezca el día entero. Aprender a interpretar y aplicar los horóscopos con mayor profundidad y propósito es lo que transforma esta antigua sabiduría en una guía práctica para la vida moderna.' },
          { type: 'h2', text: 'Las Cinco Categorías del Horóscopo: Una Visión Profunda' },
          { type: 'p', text: 'Un horóscopo completo abarca generalmente cinco dimensiones, cada una ofreciendo perspectivas sobre diferentes aspectos del flujo energético del día. Comprender qué significa cada categoría es el primer paso para aplicar los horóscopos con precisión y eficacia real.' },
          { type: 'ul', items: [
            'General: La energía y el flujo global del día — el indicador más fundamental que informa el resto',
            'Amor: Conexión emocional, dinámicas de relaciones e indicadores de oportunidades románticas',
            'Trabajo: Señales del momento astronómico para el éxito profesional, la creatividad, la colaboración y la ambición',
            'Salud: Niveles de energía física, indicadores de estrés y necesidades de autocuidado prioritarias',
            'Dinero: Ventanas de oportunidad financiera, advertencias sobre impulsos de gasto y referencias para el timing de inversiones'
          ]},
          { type: 'h2', text: 'Cómo Interpretar los Sistemas de Puntuación' },
          { type: 'p', text: 'Muchos servicios de horóscopos expresan sus lecturas mediante puntuaciones (1-100) o calificaciones con estrellas. Estos números son indicadores relativos de energía, no juicios absolutos de si el día será bueno o malo. Un día de 60 puntos no es necesariamente un día negativo — comprender qué tipo de energía representa esa puntuación y responder de manera adecuada puede hacer de cualquier día una experiencia excelente. Incluso en un día de 40 puntos, quienes entienden el mensaje subyacente pueden orientar sus acciones de manera que el día resulte pleno y significativo.' },
          { type: 'h2', text: '3 Pasos para Aplicar el Horóscopo a Tu Vida Real' },
          { type: 'p', text: 'Una vez comprendido el marco básico de los horóscopos, lo verdaderamente transformador es aprender a convertir esa información en guía de acción concreta. Los siguientes tres pasos te ayudarán a integrar la sabiduría estelar en tus decisiones cotidianas, haciendo que el horóscopo pase de ser texto sobre papel a una brújula viva para tu día.' },
          { type: 'ul', items: [
            'Paso 1 — Contexto: Identifica las energías dominantes del día y realiza una interpretación personalizada aplicándolas a tu situación concreta actual',
            'Paso 2 — Intención: Amplifica con acción deliberada las energías favorables; prepárate de forma proactiva, mental y prácticamente, para los aspectos que requieren precaución',
            'Paso 3 — Revisión nocturna: Al final del día, compara tu lectura matutina con tus experiencias reales para ir cultivando una sensibilidad personal cada vez más afinada'
          ]},
          { type: 'h2', text: 'Diferencias entre Horóscopos Diarios, Semanales y Mensuales' },
          { type: 'p', text: 'Cada escala temporal del horóscopo tiene su propio enfoque y utilidad específica, y combinarlas produce los mejores resultados. El horóscopo diario refleja las posiciones planetarias exactas de ese día y es ideal para orientar decisiones y acciones cotidianas concretas. El horóscopo semanal capta tendencias y temas más amplios, siendo útil para la planificación de la semana laboral y social. El horóscopo mensual revela los grandes ciclos y oportunidades del mes, perfecto para establecer metas y trazar planes a largo plazo. Usarlos conjuntamente te proporciona tanto el detalle del corto plazo como la perspectiva del largo plazo.' },
          { type: 'h2', text: 'Cuando el Horóscopo No Coincide con Tu Experiencia' },
          { type: 'p', text: 'A veces las lecturas simplemente no resonarán contigo — y eso es completamente normal e incluso esperable. Los horóscopos diarios masivos son orientación generalizada diseñada para millones de personas que comparten el mismo signo solar. No pueden tener en cuenta los detalles únicos de tu carta natal individual. Tu signo lunar, tu Ascendente y tus circunstancias personales actuales pueden llevar a experiencias muy diferentes a las de otra persona nacida bajo el mismo signo solar. Cuando esto sucede, no lo interpretes como un fallo del sistema, sino como un recordatorio de que eres mucho más que tu signo solar.' },
          { type: 'h2', text: 'El Horóscopo es una Brújula, No un GPS' },
          { type: 'p', text: 'La clave para usar los horóscopos con sabiduría está en tratarlos como brújulas orientadoras, no como sistemas GPS de precisión milimétrica. No te dirán exactamente "a las 3 de la tarde del martes te ocurrirá esto", sino que te proporcionan una orientación direccional que te ayuda a comenzar cada día con mayor conciencia e intención. Cuando adoptas esta perspectiva al leer tu horóscopo, este se convierte naturalmente en una valiosa herramienta que promueve el crecimiento personal y enriquece tu experiencia de vida cotidiana.' },
          { type: 'quote', text: '"El horóscopo no es una sentencia del destino; es el pronóstico meteorológico de la energía cósmica — conócelo y podrás prepararte mejor para cada nuevo día."' },
        ],
      },
    },
  },
];
