/**
 * 운세 생성을 위한 템플릿 데이터
 */

import type { LocalizedText, HoroscopeCategory } from '@/types';

// 템플릿 타입 정의
export interface HoroscopeTemplates {
  overall: {
    high: LocalizedText[];
    medium: LocalizedText[];
    low: LocalizedText[];
  };
  love: {
    high: LocalizedText[];
    medium: LocalizedText[];
    low: LocalizedText[];
  };
  career: {
    high: LocalizedText[];
    medium: LocalizedText[];
    low: LocalizedText[];
  };
  health: {
    high: LocalizedText[];
    medium: LocalizedText[];
    low: LocalizedText[];
  };
  money: {
    high: LocalizedText[];
    medium: LocalizedText[];
    low: LocalizedText[];
  };
}

export const horoscopeTemplates: HoroscopeTemplates = {
  overall: {
    high: [
      {
        ko: '오늘은 마치 우주가 당신 편인 것처럼 모든 일이 자연스럽게 흘러가는 특별한 날입니다. 당신이 오랫동안 준비해온 것들이 드디어 빛을 발할 준비가 되었고, 주변의 에너지도 당신을 향해 정렬되어 있습니다. 자신감을 가지고 도전하세요—이런 날은 자주 오지 않습니다.',
        en: 'Today feels as though the universe itself is aligned in your favor, making everything flow with unusual ease. The efforts you have quietly been building are finally ready to shine, and the people around you are more receptive than ever. Step forward with confidence—days like this are rare, and you deserve to claim them fully.',
        zh: '今天宇宙仿佛站在你这边，一切都自然流畅。你长期积累的努力终于要绽放光芒，周围的能量也在向你聚集。带着自信迎接挑战吧——这样的日子并不多见。',
        ja: '今日は宇宙があなたの味方をしているかのように、すべてが自然に流れる特別な一日です。長い間準備してきたことがついに輝き始め、周囲のエネルギーもあなたに向けて整っています。自信を持って挑んでください。',
        es: 'Hoy el universo parece estar de tu lado, haciendo que todo fluya con una facilidad inusual. Los esfuerzos que has estado construyendo en silencio están listos para brillar, y quienes te rodean son más receptivos que nunca. Da un paso al frente con confianza.',
      },
      {
        ko: '별들이 오늘 당신을 특별히 주목하고 있습니다. 오랫동안 기다려온 새로운 기회의 문이 서서히 열리고 있으며, 당신은 이미 그것을 받아들일 준비가 되어 있습니다. 두 눈을 크게 뜨고 신호를 놓치지 마세요—행운은 준비된 자에게만 찾아옵니다.',
        en: 'The stars have singled you out today with special attention, and the doors to opportunities you have long awaited are beginning to open. You are already more prepared than you realize, and the universe is simply waiting for you to notice. Keep your eyes wide open—luck only visits those who are ready.',
        zh: '星星今天特别关注着你。期待已久的新机会之门正在缓缓开启，而你已经做好了接受的准备。睁大眼睛，不要错过信号——好运只降临于有准备的人。',
        ja: '星々は今日あなたに特別な注目を向けています。長い間待ち望んでいた新しいチャンスの扉がゆっくりと開き始めており、あなたはすでにそれを受け入れる準備ができています。目を大きく開けてサインを見逃さないでください。',
        es: 'Las estrellas te observan con atención especial hoy, y las puertas de oportunidades que has esperado durante mucho tiempo comienzan a abrirse. Ya estás más preparado de lo que crees. Mantén los ojos bien abiertos—la suerte solo visita a quienes están listos.',
      },
      {
        ko: '오늘 당신의 존재 자체가 주변에 빛을 발하는 날입니다. 당신이 내뿜는 긍정적인 에너지가 자연스럽게 사람들을 끌어당기고, 그 연결이 예상치 못한 좋은 결과로 이어질 것입니다. 따뜻하게 마음을 열고 주변과 교류하세요—오늘의 인연이 미래를 바꿀 수 있습니다.',
        en: 'Today your very presence radiates a warmth that draws people toward you in meaningful ways. The positive energy you project is creating invisible connections that will blossom into unexpected good results. Open your heart generously—the person you meet or encourage today could change the trajectory of your future.',
        zh: '今天你的存在本身就在向周围散发光芒。你散发的积极能量自然地吸引着人们，这种联结将带来意想不到的好结果。敞开心扉与周围交流吧——今天的缘分可能会改变未来。',
        ja: '今日はあなたの存在そのものが周囲に光を放つ日です。あなたが発するポジティブなエネルギーが自然と人を引き寄せ、その繋がりが予想外の良い結果につながるでしょう。温かく心を開いて周囲と交流してください。',
        es: 'Hoy tu propia presencia irradia una calidez que atrae a las personas de maneras significativas. La energía positiva que proyectas está creando conexiones invisibles que florecerán en resultados inesperadamente buenos. Abre tu corazón generosamente.',
      },
      {
        ko: '오늘은 손 대는 것마다 황금으로 변하는 것 같은 느낌이 드는 날입니다. 이미 당신 안에 쌓여 있던 능력과 경험이 오늘 하루 완벽하게 발현될 준비가 되어 있습니다. 머뭇거리지 말고 용기를 내세요—지금 이 순간이 바로 당신이 기다려온 그 순간입니다.',
        en: 'Today everything you touch feels like it turns to gold, because the skills and experience you have accumulated are perfectly primed to express themselves. This is not magic—it is the payoff of all your past preparation aligning with today\'s ideal conditions. Do not hesitate; the moment you have been waiting for is right now.',
        zh: '今天你做的每件事都能取得成功，因为你内心积累的能力和经验今天将完美呈现。不要犹豫，勇敢一点——现在正是你一直等待的那个时刻。',
        ja: '今日は手をつけるものすべてが成功を収めることができます。あなたの中に蓄積された能力と経験が今日完璧に発揮される準備ができています。ためらわずに勇気を出してください—今この瞬間がまさにあなたが待ち望んでいた瞬間です。',
        es: 'Hoy todo lo que tocas parece volverse oro, porque las habilidades y experiencia que has acumulado están perfectamente preparadas para expresarse. No dudes; el momento que has estado esperando es ahora mismo.',
      },
      {
        ko: '오늘은 꿈과 현실 사이의 간격이 그 어느 때보다 좁아진 날입니다. 완벽한 타이밍, 충분한 준비, 그리고 우주의 지지가 한데 모여 당신이 원하는 것을 이루기에 더없이 좋은 환경이 갖춰졌습니다. 지금 바로 첫 발을 내딛으세요—완벽한 날을 기다리며 망설일 필요가 없습니다. 오늘이 바로 그 날입니다.',
        en: 'Today the gap between your dreams and reality has narrowed to almost nothing. Perfect timing, sufficient preparation, and the quiet support of the universe have all converged to create ideal conditions for you to achieve what you desire. Take that first step right now—you no longer need to wait for the perfect day, because today is exactly that.',
        zh: '今天梦想与现实之间的距离比任何时候都近。完美的时机、充分的准备和宇宙的支持汇聚在一起，为你实现愿望创造了最佳环境。现在就迈出第一步——今天正是那个完美的日子。',
        ja: '今日は夢と現実の間の距離がかつてないほど縮まった日です。完璧なタイミング、十分な準備、そして宇宙のサポートが一つに集まり、あなたが望むものを叶えるのに完璧な環境が整いました。今すぐ一歩を踏み出してください。',
        es: 'Hoy la brecha entre tus sueños y la realidad se ha reducido a casi nada. El momento perfecto, la preparación suficiente y el apoyo silencioso del universo se han unido para crear condiciones ideales. Da ese primer paso ahora mismo—hoy es exactamente el día perfecto.',
      },
      {
        ko: '당신이 오랫동안 마음속에 품어온 계획이 오늘 드디어 실행될 준비가 되었습니다. 우주는 기다리는 자가 아닌 행동하는 자를 돕고, 지금 이 에너지는 한시적입니다. 오래 계획했던 일을 실행에 옮기세요—시작하는 용기가 모든 것을 바꿉니다.',
        en: 'The plan you have quietly nurtured in your heart for a long time is finally ready to be set in motion today. The universe favors those who act over those who wait, and this current energy is fleeting. Put your long-held plans into action—the courage to begin changes everything.',
        zh: '你长期在心中酝酿的计划今天终于准备好付诸行动了。宇宙支持行动者而非等待者，而这股能量是短暂的。把长期计划的事情付诸行动——开始的勇气能改变一切。',
        ja: '長い間心の中で温めてきた計画が、今日ついに実行に移す準備ができました。宇宙は待つ者ではなく行動する者を助け、今のエネルギーは一時的なものです。長い間計画していたことを実行に移してください。',
        es: 'El plan que has estado nutriendo en silencio en tu corazón durante mucho tiempo está finalmente listo para ponerse en marcha hoy. El universo favorece a quienes actúan sobre quienes esperan, y esta energía es pasajera. Pon tus planes en acción—el coraje de comenzar lo cambia todo.',
      },
      {
        ko: '오늘은 내면의 목소리가 유독 선명하게 들리는 날입니다. 오랜 경험으로 갈고 닦인 당신의 직감은 오늘 거의 틀리지 않을 만큼 예리하게 작동하고 있습니다. 망설이지 말고 첫 번째 느낌을 믿으세요—당신의 내면은 이미 답을 알고 있습니다.',
        en: 'Today your inner voice speaks with unusual clarity, sharpened by all the experience you have gathered over time. Your instincts are operating at a rare peak of accuracy, making your first impressions nearly infallible. Trust that first feeling without hesitation—your inner self already knows the answer.',
        zh: '今天内心的声音格外清晰。经过长期经验磨砺的直觉今天异常敏锐，几乎不会出错。不要犹豫，相信第一感觉——你的内心已经知道答案了。',
        ja: '今日は内なる声が特に鮮明に聞こえる日です。長年の経験で磨かれた直感が今日は鋭く機能しています。ためらわずに最初の感覚を信じてください—あなたの内面はすでに答えを知っています。',
        es: 'Hoy tu voz interior habla con una claridad inusual, agudizada por toda la experiencia que has acumulado. Tus instintos funcionan con una precisión excepcional hoy. Confía en esa primera impresión sin dudar—tu interior ya conoce la respuesta.',
      },
      {
        ko: '지금 당신이 내딛는 작은 한 걸음이 사실은 엄청난 변화의 시작입니다. 위대한 성공은 언제나 작고 용감한 첫 행동에서 시작되었으며, 오늘의 우주적 에너지가 그 첫 발을 한층 더 강력하게 만들어줍니다. 머뭇거림을 내려놓고 한 발 앞으로 나아가세요—내일의 당신이 오늘을 감사할 것입니다.',
        en: 'The small step you take right now is actually the beginning of a tremendous transformation. Every great success has always started from a small, courageous first action, and today\'s cosmic energy makes that first step significantly more powerful. Let go of hesitation and move forward—your future self will be grateful for what you do today.',
        zh: '你现在迈出的小小一步其实是巨大变化的开始。伟大的成功总是从小小的勇敢第一步开始，而今天的宇宙能量让这第一步更加有力。放下犹豫，向前迈步——明天的你会感谢今天的自己。',
        ja: '今あなたが踏み出す小さな一歩が、実は大きな変化の始まりです。偉大な成功は常に小さく勇敢な最初の行動から始まりました。躊躇を手放して一歩前に踏み出してください。',
        es: 'El pequeño paso que das ahora es en realidad el comienzo de una transformación tremenda. Todo gran éxito siempre empezó con una primera acción pequeña y valiente, y la energía cósmica de hoy hace ese primer paso significativamente más poderoso. Suelta la duda y avanza.',
      },
      {
        ko: '당신이 베풀어온 선의와 친절이 오늘 다양한 형태로 돌아옵니다. 우주는 철저한 균형의 법칙으로 작동하며, 당신이 뿌려온 씨앗이 지금 이 순간 꽃을 피우기 시작하고 있습니다. 오늘의 나눔과 친절함을 아낌없이 표현하세요—선의의 순환은 멈추지 않습니다.',
        en: 'The goodwill and kindness you have extended to others return to you today in various and wonderful forms. The universe operates on a strict law of balance, and the seeds you have planted are beginning to bloom at this very moment. Express your generosity freely today—the cycle of goodwill never stops.',
        zh: '你给予他人的善意和友善今天以各种形式回报给你。宇宙按照严格的平衡法则运作，你播下的种子正在此刻开始开花。今天毫不吝惜地表达你的善意吧——善意的循环永不停止。',
        ja: '他人への善意と親切が今日様々な形で返ってきます。宇宙は厳格な均衡の法則で動いており、あなたが蒔いてきた種が今この瞬間花開き始めています。今日の分かち合いと親切を惜しみなく表現してください。',
        es: 'La buena voluntad y amabilidad que has extendido a otros regresan hoy en formas variadas y maravillosas. El universo opera con una ley estricta de equilibrio, y las semillas que has plantado están empezando a florecer en este mismo momento. Expresa tu generosidad libremente hoy.',
      },
    ],
    medium: [
      {
        ko: '오늘은 드라마틱한 사건보다 조용하고 안정된 흐름 속에서 하루가 펼쳐집니다. 사실 이런 평온한 날이야말로 자신을 돌아보고 감사의 마음을 키우기에 가장 좋은 날입니다. 오늘 하루, 당연하게 여겼던 것들에 한 번씩 감사해보면 의외의 따뜻함을 발견할 것입니다.',
        en: 'Today unfolds in a quiet, stable rhythm rather than dramatic events, and that steadiness is itself a gift. Peaceful days like this are actually the best opportunity to look inward and cultivate gratitude for what you have. Take a moment to appreciate the things you usually take for granted—you may be surprised by the warmth you find.',
        zh: '今天在平静稳定的节奏中展开，而非戏剧性事件。事实上，这样平静的日子是回望自己、培养感恩之心的最佳时机。试着对那些理所当然的事情表达感谢，你会发现意想不到的温暖。',
        ja: '今日はドラマチックな出来事より静かで安定した流れの中で一日が展開します。こんな穏やかな日こそ自分を振り返り感謝の心を育てるのに最適な日です。当たり前に思っていたことに感謝してみると、思いがけない温かさを発見するでしょう。',
        es: 'Hoy se desarrolla en un ritmo tranquilo y estable en lugar de eventos dramáticos. Los días pacíficos como este son la mejor oportunidad para mirar hacia adentro y cultivar la gratitud. Tómate un momento para apreciar lo que normalmente das por sentado—puede que te sorprenda la calidez que encuentras.',
      },
      {
        ko: '평범한 일상 속에도 당신만이 볼 수 있는 소소한 행복의 조각들이 숨어 있습니다. 특별한 무언가를 기다리는 대신, 지금 이 순간 주어진 것들을 음미해보세요. 오늘의 작은 발견이 내일의 큰 감사로 이어질 것입니다.',
        en: 'Hidden within your ordinary routine are small pieces of happiness that only you can see if you look closely enough. Instead of waiting for something extraordinary, take time to savor what is right in front of you. Today\'s small discovery will grow into tomorrow\'s deeper gratitude.',
        zh: '在平凡的日常中藏着只有你才能看到的小幸福碎片。与其等待特别的事情，不如好好品味当下所拥有的。今天的小发现将成为明天更深的感恩。',
        ja: '平凡な日常の中にも、あなただけが見つけられる小さな幸せの欠片が隠れています。特別なことを待つのではなく、今この瞬間与えられているものを味わってみてください。今日の小さな発見が明日の大きな感謝につながるでしょう。',
        es: 'Ocultos en tu rutina ordinaria hay pequeños fragmentos de felicidad que solo tú puedes ver si miras con atención. En lugar de esperar algo extraordinario, saborea lo que tienes frente a ti. El pequeño descubrimiento de hoy se convertirá en la gratitud más profunda de mañana.',
      },
      {
        ko: '오늘은 서두를 이유도, 불안해할 이유도 없는 고요한 하루입니다. 이 고요함은 나약함이 아니라 내면이 충분히 자리를 잡고 있다는 신호입니다. 자연스러운 흐름을 따라가면서 지금 이 순간을 온전히 즐겨보세요.',
        en: 'Today is a quietly composed day with no real reason to rush or worry. This calm is not weakness—it is a signal that your inner world is settled and secure. Simply follow the natural flow and allow yourself to be fully present in this moment.',
        zh: '今天是一个既不需要着急也不需要担心的宁静日子。这份平静不是软弱，而是内心充分安定的信号。跟随自然的节奏，完全享受此刻吧。',
        ja: '今日は急ぐ理由も不安になる理由もない静かな一日です。この静けさは弱さではなく、内面がしっかりと根付いているサインです。自然な流れに従いながら今この瞬間を心ゆくまで楽しんでください。',
        es: 'Hoy es un día tranquilamente equilibrado sin razón real para apresurarse o preocuparse. Esta calma no es debilidad—es una señal de que tu mundo interior está asentado y seguro. Simplemente sigue el flujo natural y permítete estar plenamente presente.',
      },
      {
        ko: '안정된 에너지가 당신을 부드럽게 감싸는 날입니다. 거대한 도전보다 지금 눈앞에 있는 것에 집중할 때, 오히려 더 깊은 만족과 명확함을 얻을 수 있습니다. 현재에 뿌리를 내리면 흔들리지 않는 힘이 생깁니다.',
        en: 'Stable energy gently wraps around you today, creating a feeling of quiet centeredness. Focusing on what is directly in front of you, rather than distant challenges, actually yields deeper satisfaction and greater clarity. When you root yourself in the present, you gain an unshakeable strength.',
        zh: '稳定的能量今天温柔地包围着你。与其关注遥远的挑战，不如专注于眼前的事物，反而能获得更深的满足和清晰感。扎根于当下，你会获得不可撼动的力量。',
        ja: '安定したエネルギーがあなたを優しく包む日です。遠くの挑戦より今目の前のことに集中すると、より深い満足と明確さを得られます。現在に根を張ると、揺るぎない力が生まれます。',
        es: 'Energía estable te envuelve suavemente hoy, creando una sensación de quietud centrada. Enfocarte en lo que tienes directamente frente a ti, en lugar de desafíos distantes, produce satisfacción más profunda y mayor claridad. Cuando te arraizas en el presente, ganas una fortaleza inquebrantable.',
      },
      {
        ko: '특별히 눈에 띄는 사건은 없지만, 그 평온함 자체가 오늘의 선물입니다. 모든 것이 극적으로 돌아가지 않아도 괜찮으며, 이런 조용한 날에 당신의 에너지는 차곡차곡 충전됩니다. 내일을 위해 오늘의 편안함을 충분히 받아들이세요.',
        en: 'Nothing stands out in a dramatic way today, and that very peacefulness is today\'s gift to you. It is perfectly fine for everything not to be spinning dramatically, because on quiet days like this your inner energy recharges steadily. Accept today\'s comfort fully—it is preparing you for tomorrow.',
        zh: '今天没有特别引人注目的事情，但这份平静本身就是今天的礼物。不是所有事情都需要戏剧性发展，在这样平静的日子里你的能量在悄悄充电。充分接受今天的舒适吧——它是在为明天做准备。',
        ja: '特別目立つ出来事はありませんが、その穏やかさ自体が今日の贈り物です。すべてが劇的に展開しなくても大丈夫で、こんな静かな日にあなたのエネルギーはしっかり充電されます。明日のために今日の心地よさを十分に受け入れてください。',
        es: 'Nada sobresale de manera dramática hoy, y esa tranquilidad misma es el regalo de hoy para ti. Está perfectamente bien que no todo gire dramáticamente, porque en días tranquilos como este tu energía interior se recarga establemente. Acepta plenamente la comodidad de hoy—te está preparando para mañana.',
      },
      {
        ko: '오늘은 새로운 것을 추가하기보다 지금 가진 것을 더 잘 다듬는 데 집중하면 놀라운 가치를 발견하게 됩니다. 이미 당신 곁에 있는 것들 중에 아직 충분히 감사받지 못한 것들이 많습니다. 기존의 것을 정성껏 돌볼 때 새로운 것보다 더 큰 만족이 찾아옵니다.',
        en: 'Today, focusing on refining what you already have rather than adding something new reveals surprising value. Among the things already at your side, many have not yet been fully appreciated. When you tend carefully to what already exists, a satisfaction deeper than anything new can provide will come.',
        zh: '今天与其添加新事物，不如专注于打磨现有的，你会发现惊人的价值。在你身边已有的事物中，有很多还没有得到充分的感谢。用心呵护现有的事物，会带来比任何新事物都更大的满足感。',
        ja: '今日は新しいものを加えるよりも、すでに持っているものをより良く磨くことに集中すると驚くべき価値を発見できます。すでにあなたのそばにあるものの中に、まだ十分に感謝されていないものがたくさんあります。既存のものを丁寧に大切にする時、新しいものより大きな満足が訪れます。',
        es: 'Hoy, enfocarte en refinar lo que ya tienes en lugar de agregar algo nuevo revela un valor sorprendente. Entre las cosas que ya están a tu lado, muchas no han sido plenamente apreciadas. Cuando cuidas con esmero lo que ya existe, llega una satisfacción más profunda que cualquier cosa nueva.',
      },
      {
        ko: '오늘 주변 사람들과 나누는 진솔한 대화 한 마디가 생각보다 훨씬 큰 의미를 가질 수 있습니다. 소통은 멀리서 찾을 필요 없이 지금 옆에 있는 사람에게 따뜻한 관심을 보내는 것에서 시작됩니다. 오늘 누군가에게 먼저 말을 건네보세요—당신의 말이 그 사람의 하루를 바꿀 수 있습니다.',
        en: 'A single sincere exchange with someone around you today can carry far more meaning than you expect. Connection does not require searching far—it begins with showing warm attention to the person right beside you. Reach out to someone first today; your words might change their entire day.',
        zh: '今天与周围人的一句真诚交流可能比你想象的更有意义。沟通不需要远处寻找，从对身边的人给予温暖关注开始。今天主动跟某人说话吧——你的话可能会改变那个人的一天。',
        ja: '今日周りの人と交わす率直な言葉一つが、思ったよりずっと大きな意味を持つことがあります。コミュニケーションは遠くに求める必要はなく、今隣にいる人に温かい関心を向けることから始まります。今日誰かに先に声をかけてみてください。',
        es: 'Un intercambio sincero con alguien a tu alrededor hoy puede tener mucho más significado de lo que esperas. La conexión no requiere buscar lejos—comienza mostrando atención cálida a la persona que está justo a tu lado. Acércate primero a alguien hoy; tus palabras podrían cambiar su día entero.',
      },
      {
        ko: '서두르지 않아도 당신이 가야 할 곳에 정확히 도달할 것입니다. 자연의 강물처럼 굽이치며 흐르지만 결국 바다에 닿는 것처럼, 오늘의 여유로운 흐름도 당신을 올바른 방향으로 이끌고 있습니다. 조급함 대신 신뢰를 선택하세요—모든 것은 때가 있습니다.',
        en: 'Without rushing, you will arrive precisely where you need to be. Like a river that winds and curves but always reaches the sea, today\'s unhurried pace is also guiding you in the right direction. Choose trust over urgency—everything has its season.',
        zh: '不着急也能准确到达你该去的地方。就像河流蜿蜒曲折最终都能抵达大海，今天从容的节奏也在引导你走向正确的方向。选择信任而非焦急——万事皆有时机。',
        ja: '急がなくても、あなたが行くべき場所に正確に到達するでしょう。自然の川が曲がりくねりながらも最終的に海に辿り着くように、今日のゆったりした流れもあなたを正しい方向に導いています。焦りの代わりに信頼を選んでください。',
        es: 'Sin apresurarte, llegarás exactamente a donde necesitas estar. Como un río que serpentea pero siempre alcanza el mar, el ritmo tranquilo de hoy también te guía en la dirección correcta. Elige la confianza sobre la urgencia—todo tiene su momento.',
      },
      {
        ko: '반복되는 일상 속에서 오늘 유독 눈에 들어오는 작은 디테일이 있다면, 그것이 숨겨진 메시지일 수 있습니다. 익숙한 것들을 낯선 시선으로 바라볼 때 그 안에서 새로운 패턴과 가능성이 보이기 시작합니다. 오늘 하루, 천천히 주변을 관찰해보세요—발견의 즐거움이 기다리고 있습니다.',
        en: 'If something small in your familiar routine catches your eye unusually today, it may be a hidden message worth examining. When you look at familiar things through fresh eyes, new patterns and possibilities begin to emerge from within them. Observe your surroundings slowly today—the joy of discovery is waiting.',
        zh: '如果今天在熟悉的日常中有什么小细节格外引起你的注意，那可能是一条隐藏的信息。用陌生的眼光看待熟悉的事物时，其中会开始显现新的模式和可能性。今天慢慢观察周围吧——发现的乐趣在等待着你。',
        ja: '繰り返す日常の中で今日特に目に入る小さなディテールがあれば、それは隠されたメッセージかもしれません。馴染みのあるものを新鮮な視線で見る時、その中から新しいパターンと可能性が見えてきます。今日ゆっくり周囲を観察してみてください。',
        es: 'Si algo pequeño en tu rutina familiar capta tu atención de manera inusual hoy, puede ser un mensaje oculto que vale la pena examinar. Cuando miras cosas familiares con ojos frescos, nuevos patrones y posibilidades comienzan a emerger. Observa tu entorno lentamente hoy—la alegría del descubrimiento te espera.',
      },
    ],
    low: [
      {
        ko: '오늘은 계획대로 풀리지 않는 일들이 생겨 조금 지치는 하루가 될 수 있습니다. 하지만 모든 사람에게 이런 날은 찾아오며, 이 시간은 당신을 더 단단하게 만드는 과정의 일부입니다. 무리하지 말고 오늘은 자신을 돌보는 데 집중하세요—내일은 반드시 더 나아집니다.',
        en: 'Today may feel draining as things refuse to go according to plan. But everyone encounters days like this, and this time is simply part of the process that makes you stronger. Focus on caring for yourself without overexerting—tomorrow will undeniably be better.',
        zh: '今天可能会有些事情不按计划进行，让你有点疲惫。但每个人都会遇到这样的日子，这段时间是让你变得更坚强的过程的一部分。不要勉强，今天专注于照顾自己——明天一定会更好。',
        ja: '今日は計画通りに進まないことが生じて少し疲れる一日になるかもしれません。でもすべての人にこんな日は訪れ、この時間はあなたをより強くするプロセスの一部です。無理せず今日は自分を大切にすることに集中してください。',
        es: 'Hoy puede sentirse agotador ya que las cosas se niegan a salir según lo planeado. Pero todos enfrentan días así, y este tiempo es simplemente parte del proceso que te hace más fuerte. Enfócate en cuidarte sin sobreexigirte—mañana indudablemente será mejor.',
      },
      {
        ko: '예상 밖의 장벽이 나타나 당혹스럽게 느껴질 수 있지만, 이것은 당신이 유독 나쁜 사람이라서가 아닙니다. 최선의 계획도 때로는 외부 환경에 의해 흔들리며, 그 순간을 침착하게 넘기는 것이 바로 지혜입니다. 오늘은 결과보다 과정에 집중하며 한 발씩 나아가세요.',
        en: 'Unexpected obstacles may appear today and leave you feeling thrown off, but this is not a reflection of any personal failing. Even the best plans are sometimes disrupted by external circumstances, and navigating those moments with composure is itself wisdom. Focus on the process rather than the outcome today, and move forward one step at a time.',
        zh: '意外的障碍可能会出现并让你感到困惑，但这不是因为你特别不幸。即使是最好的计划有时也会被外部环境所打乱，冷静地渡过那一刻正是智慧。今天专注于过程而非结果，一步步前进吧。',
        ja: '予想外の障壁が現れて戸惑いを感じることがあるかもしれませんが、これはあなたが特別悪い人だからではありません。最善の計画も時に外部環境によって揺らぎ、その瞬間を冷静に乗り越えることこそが知恵です。今日は結果より過程に集中しながら一歩ずつ進んでください。',
        es: 'Obstáculos inesperados pueden aparecer hoy y dejarte descolocado, pero esto no refleja ningún fallo personal. Incluso los mejores planes son disrumpidos a veces por circunstancias externas, y navegar esos momentos con compostura es sabiduría en sí misma. Enfócate en el proceso más que en el resultado hoy.',
      },
      {
        ko: '오늘은 몸과 마음의 에너지가 평소보다 낮은 날입니다. 이런 날은 억지로 끌어올리려 하기보다 몸이 보내는 신호를 존중하고 충분히 쉬는 것이 더 현명합니다. 재충전의 시간은 낭비가 아니라 내일의 도약을 위한 투자임을 기억하세요.',
        en: 'Today your physical and mental energy runs lower than usual. On days like this, it is wiser to respect the signals your body is sending and rest fully, rather than forcing yourself to push through. Remember that recharging time is not waste—it is an investment in tomorrow\'s leap forward.',
        zh: '今天身心能量比平时低。这样的日子与其强行提升，不如尊重身体发出的信号充分休息，这才是更明智的选择。记住，充电时间不是浪费，而是对明天腾飞的投资。',
        ja: '今日は体と心のエネルギーが平日より低い日です。こんな日は無理に引き上げようとするより、体が送るサインを尊重して十分に休む方が賢明です。充電の時間は無駄ではなく、明日の飛躍への投資であることを覚えておいてください。',
        es: 'Hoy tu energía física y mental corre más baja de lo usual. En días así, es más sabio respetar las señales que envía tu cuerpo y descansar plenamente, en lugar de forzarte a seguir adelante. Recuerda que el tiempo de recarga no es desperdicio—es una inversión en el salto de mañana.',
      },
      {
        ko: '오늘은 중요한 결정을 내리기보다 기다리고 살피는 것이 더 유리한 날입니다. 급하게 결론을 내렸다가 나중에 후회하는 것보다, 한 박자 쉬어가며 더 많은 정보를 모으는 편이 훨씬 낫습니다. 서두르지 않는 것도 하나의 강력한 선택임을 기억하세요.',
        en: 'Today it is more advantageous to wait and observe than to make important decisions. Gathering more information by pausing for a beat is far better than rushing to conclusions you may later regret. Remember that not rushing is itself a powerful choice.',
        zh: '今天与其做出重要决定，不如等待观察更为有利。比起仓促得出结论后悔，暂停一下收集更多信息要好得多。记住，不着急也是一种强有力的选择。',
        ja: '今日は重要な決定を下すより待って観察することがより有利な日です。急いで結論を出して後悔するより、一拍置いてより多くの情報を集める方がずっとよいです。急がないことも一つの強力な選択であることを覚えておいてください。',
        es: 'Hoy es más ventajoso esperar y observar que tomar decisiones importantes. Reunir más información haciendo una pausa es mucho mejor que apresurar conclusiones que luego podrías lamentar. Recuerda que no apresurarse es en sí misma una opción poderosa.',
      },
      {
        ko: '오늘은 새로운 도전보다 이미 쌓아온 것을 지키고 안정을 유지하는 데 에너지를 쓰는 것이 현명합니다. 전진만이 성공이 아니며, 때로는 버티고 유지하는 것이 가장 용감한 행동입니다. 오늘의 안정은 내일의 도약을 위한 발판이 됩니다.',
        en: 'Today it is wise to invest your energy in protecting what you have already built and maintaining stability, rather than pursuing new challenges. Moving forward is not the only form of success; sometimes holding on and maintaining is the most courageous act. Today\'s stability becomes the foundation for tomorrow\'s leap.',
        zh: '今天明智的做法是将精力用于守护已积累的成果和维持稳定，而非追求新的挑战。前进并非成功的唯一形式，有时坚守和维持才是最勇敢的行动。今天的稳定将成为明天腾飞的跳板。',
        ja: '今日は新しい挑戦より、すでに積み上げてきたものを守り安定を維持することにエネルギーを使う方が賢明です。前進だけが成功ではなく、時には耐えて維持することが最も勇敢な行動です。今日の安定は明日の飛躍の足がかりになります。',
        es: 'Hoy es sabio invertir tu energía en proteger lo que ya has construido y mantener la estabilidad, en lugar de perseguir nuevos desafíos. Avanzar no es la única forma de éxito; a veces aguantar y mantener es el acto más valiente. La estabilidad de hoy se convierte en el trampolín del salto de mañana.',
      },
      {
        ko: '인내심이 시험받는 날이지만, 이 시험 자체가 당신이 성장하고 있다는 증거입니다. 쉬운 날에는 근육이 자라지 않듯, 오늘의 어려움이 내면의 힘을 단련시키고 있습니다. 이 또한 반드시 지나가며, 지나고 나면 더 강해진 당신이 남을 것입니다.',
        en: 'Patience is being tested today, but that test itself is evidence that you are growing. Just as muscles do not develop on easy days, today\'s difficulty is training your inner strength. This too shall undeniably pass, and when it does, a stronger version of you will remain.',
        zh: '今天耐心受到考验，但这个考验本身就是你在成长的证明。就像肌肉不在轻松的日子里生长，今天的困难正在锻炼你的内在力量。这也一定会过去，过去之后留下的将是更强大的你。',
        ja: '忍耐心が試される日ですが、この試験自体があなたが成長している証拠です。楽な日に筋肉が育たないように、今日の困難が内面の力を鍛えています。これも必ず過ぎ去り、過ぎた後にはより強くなったあなたが残ります。',
        es: 'La paciencia está siendo puesta a prueba hoy, pero esa prueba misma es evidencia de que estás creciendo. Así como los músculos no se desarrollan en días fáciles, la dificultad de hoy está entrenando tu fortaleza interior. Esto también pasará indudablemente, y cuando lo haga, quedará una versión más fuerte de ti.',
      },
      {
        ko: '오늘은 세운 계획이 빗나갈 수 있지만, 그 틈새에서 예상치 못한 더 나은 길이 나타날 수도 있습니다. 계획의 어긋남을 실패로 보지 말고 우주가 더 좋은 방향을 제시하는 신호로 해석해보세요. 유연한 마음이 오늘의 가장 강력한 무기입니다.',
        en: 'Plans may go off course today, but within those gaps an unexpectedly better path may appear. Rather than seeing a derailed plan as failure, try interpreting it as the universe pointing you toward a better direction. A flexible mind is your most powerful tool today.',
        zh: '今天计划可能会出错，但在那些缝隙中可能会出现意想不到的更好道路。不要把计划偏差视为失败，而是将其解读为宇宙在指引更好方向的信号。灵活的心态是今天最有力的武器。',
        ja: '今日は立てた計画が外れることがあるかもしれませんが、その隙間に予想外のより良い道が現れることもあります。計画のずれを失敗と見ず、宇宙がより良い方向を示すサインと解釈してみてください。柔軟な心が今日最も強力な武器です。',
        es: 'Los planes pueden desviarse hoy, pero dentro de esas grietas puede aparecer un camino inesperadamente mejor. En lugar de ver un plan descarrilado como fracaso, intenta interpretarlo como el universo apuntándote hacia una mejor dirección. Una mente flexible es tu herramienta más poderosa hoy.',
      },
      {
        ko: '혼자라는 느낌이 드는 날이지만, 사실 당신을 묵묵히 응원하는 사람들이 생각보다 많이 있습니다. 때로는 도움을 요청하는 것 자체가 강함의 표현이며, 연결을 통해 오늘의 무게가 훨씬 가벼워질 수 있습니다. 가까운 누군가에게 지금의 마음을 솔직하게 나눠보세요.',
        en: 'Today may feel lonely, but in truth there are more people quietly cheering for you than you realize. Sometimes asking for help is itself an expression of strength, and through connection today\'s weight can become significantly lighter. Share how you honestly feel with someone close to you.',
        zh: '今天可能会感到孤独，但事实上默默支持你的人比你想象的多。有时候寻求帮助本身就是强大的表现，通过联结今天的重担可以变得轻得多。向身边的人真诚地分享你现在的心情吧。',
        ja: '孤独に感じる日かもしれませんが、実はあなたをひそかに応援している人が思ったよりたくさんいます。時に助けを求めること自体が強さの表れで、つながりを通じて今日の重さがずっと軽くなることがあります。近くの誰かに今の気持ちを率直に打ち明けてみてください。',
        es: 'Hoy puede sentirse solitario, pero en verdad hay más personas que te animan silenciosamente de lo que crees. A veces pedir ayuda es en sí mismo una expresión de fortaleza, y a través de la conexión el peso de hoy puede volverse significativamente más ligero. Comparte cómo te sientes honestamente con alguien cercano.',
      },
      {
        ko: '오늘의 시련은 당신을 무너뜨리려는 것이 아니라 더 단단하게 빚으려는 과정입니다. 강철이 뜨거운 용광로를 통해 만들어지듯, 이 어려운 시간이 당신의 내면을 더욱 강하고 깊게 만들고 있습니다. 오늘을 버티면 내일의 당신은 한 뼘 더 성장해 있을 것입니다.',
        en: 'Today\'s trials are not meant to break you—they are the process of forging you into something stronger. Just as steel is made through the heat of a furnace, this difficult time is making your inner self deeper and more resilient. Endure today and tomorrow\'s version of you will have grown by a measure.',
        zh: '今天的考验不是要打倒你，而是要将你锻造得更坚硬的过程。就像钢铁在高温熔炉中被铸造，这段艰难的时光正在让你的内心变得更强更深沉。熬过今天，明天的你将成长一分。',
        ja: '今日の試練はあなたを壊そうとするのではなく、より強く鍛えようとするプロセスです。鋼が熱い溶鉱炉を通って作られるように、この困難な時間があなたの内面をより強く深くしています。今日を乗り越えれば明日のあなたは一回り成長しているでしょう。',
        es: 'Las pruebas de hoy no están destinadas a romperte—son el proceso de forjarte en algo más fuerte. Así como el acero se forma a través del calor de un horno, este tiempo difícil está haciendo tu interior más profundo y resistente. Soporta hoy y la versión de mañana de ti habrá crecido una medida.',
      },
    ],
  },
  love: {
    high: [
      {
        ko: '오늘은 당신이 내뿜는 따뜻한 에너지가 주변 사람의 마음을 자연스럽게 열게 만드는 특별한 날입니다. 연인과 함께라면 지금껏 쌓아온 감정이 더 깊은 층에서 연결되는 경험을 할 수 있고, 솔로라면 진심 어린 자기 표현이 예상치 못한 설렘을 불러올 수 있습니다. 오늘만큼은 조금 더 용감하게 마음을 표현해보세요—사랑은 표현될 때 비로소 자랍니다.',
        en: 'Today the warm energy you radiate naturally opens the hearts of those around you in a special way. If you are in a relationship, you can experience a connection at a deeper emotional layer than before; if you are single, sincere self-expression may invite unexpected excitement. Be a little more courageous in expressing your heart today—love only grows when it is expressed.',
        zh: '今天你散发的温暖能量自然地打开周围人的心扉。如果有恋人，你们可以体验到比以往更深层次的情感连结；如果是单身，真诚的自我表达可能会带来意想不到的心动。今天更勇敢地表达你的心意吧——爱只有在被表达时才会成长。',
        ja: '今日はあなたが発する温かいエネルギーが周りの人の心を自然と開かせる特別な日です。恋人がいれば今まで積み上げてきた感情がより深い層でつながる体験ができ、シングルなら心からの自己表現が予想外の胸の高鳴りを呼び起こすことがあります。今日は少し勇気を出して気持ちを表現してみてください。',
        es: 'Hoy la energía cálida que irradias abre naturalmente los corazones de quienes te rodean de manera especial. Si tienes pareja, puedes experimentar una conexión en una capa emocional más profunda; si estás soltero/a, la autoexpresión sincera puede invitar a emoción inesperada. Sé un poco más valiente al expresar tu corazón hoy.',
      },
      {
        ko: '사랑의 별이 오늘 유독 당신을 환하게 비추고 있습니다. 오랫동안 기다려온 새로운 만남의 가능성이 높아졌으며, 이미 사랑하는 사람이 있다면 그 관계가 한 단계 더 깊어질 신호가 도착했습니다. 마음의 문을 활짝 열고, 오늘 만나는 사람과 진심으로 교류해보세요.',
        en: 'The star of love shines especially brightly on you today. The possibility of new encounters you have long awaited has increased, and if you already love someone, a signal has arrived that the relationship is ready to deepen by another step. Open the door of your heart wide and connect genuinely with the people you meet today.',
        zh: '爱情之星今天格外明亮地照耀着你。期待已久的新邂逅可能性增加了，如果已有心上人，关系加深一步的信号已经到来。打开心扉，今天与遇到的人真诚交流吧。',
        ja: '愛の星が今日特にあなたを明るく照らしています。長い間待ち望んでいた新しい出会いの可能性が高まり、すでに愛する人がいれば、その関係がもう一段階深まるサインが届いています。心の扉を大きく開いて、今日出会う人と真心で交流してみてください。',
        es: 'La estrella del amor brilla especialmente sobre ti hoy. La posibilidad de nuevos encuentros que has esperado durante mucho tiempo ha aumentado, y si ya amas a alguien, ha llegado una señal de que la relación está lista para profundizarse. Abre de par en par la puerta de tu corazón y conéctate genuinamente hoy.',
      },
      {
        ko: '오늘은 말 한 마디가 천 마디보다 더 깊이 전달되는 날입니다. 평소에 쑥스러워서 못 했던 말, 늘 마음속에만 담아두었던 감사와 애정을 지금 꺼내 표현해보세요. 진심은 언제나 상대의 마음에 정확히 닿으며, 오늘 나누는 대화 한 마디가 관계의 전환점이 될 수 있습니다.',
        en: 'Today a single word reaches deeper than a thousand usually could. The feelings you have been too shy to express, the gratitude and affection you have kept only in your heart—bring them out and voice them now. Sincerity always lands precisely on the other person\'s heart, and a single conversation today could become a turning point in your relationship.',
        zh: '今天一句话能比平时传递得更深。那些平时因害羞而没说出口的话，一直藏在心里的感谢和爱意，现在就表达出来吧。真心总能准确地触达对方的心，今天的一句对话可能会成为关系的转折点。',
        ja: '今日は言葉一つが千の言葉より深く届く日です。恥ずかしくて言えなかった言葉、いつも心の中だけに持っていた感謝と愛情を今取り出して表現してみてください。真心はいつも相手の心に正確に届き、今日交わす一言が関係の転換点になることがあります。',
        es: 'Hoy una sola palabra llega más profundo de lo que usualmente lo harían mil. Los sentimientos que has tenido demasiada vergüenza de expresar, la gratitud y el afecto que has guardado solo en tu corazón—sácalos y exprésalos ahora. La sinceridad siempre aterriza precisamente en el corazón del otro.',
      },
      {
        ko: '당신과 소중한 사람 사이의 보이지 않는 끈이 오늘 더욱 단단해지는 날입니다. 작은 감사의 말, 따뜻한 눈빛, 먼저 건네는 스킨십 하나가 관계의 온도를 수도 높일 수 있습니다. 오늘 사랑하는 사람에게 "당신이 있어서 행복해요"라는 말을 직접 전해보세요.',
        en: 'Today the invisible thread between you and someone precious becomes even stronger. A small word of thanks, a warm gaze, or a first gesture of physical affection can raise the temperature of your relationship by degrees. Tell someone you love, directly today: "I am happy you are here."',
        zh: '今天你和珍贵的人之间看不见的纽带变得更加牢固。一句小小的感谢话、温暖的眼神、主动的一个亲密举动都能提升关系的温度。今天直接对你爱的人说"有你真幸福"吧。',
        ja: '今日はあなたと大切な人の間の見えない絆がより強くなる日です。小さな感謝の言葉、温かい眼差し、先に差し出すスキンシップ一つが関係の温度を数度上げることができます。今日愛する人に「あなたがいて幸せ」と直接伝えてみてください。',
        es: 'Hoy el hilo invisible entre tú y alguien precioso se vuelve aún más fuerte. Una pequeña palabra de gracias, una mirada cálida, o un primer gesto de afecto físico puede elevar la temperatura de tu relación por grados. Dile a alguien que amas, directamente hoy: "Soy feliz de que estés aquí."',
      },
      {
        ko: '별들이 오늘 당신의 사랑에 특별한 축복을 내리고 있습니다. 오랫동안 고백을 망설여왔다면, 오늘이 바로 그 용기를 낼 최적의 순간입니다. 거절이 두렵더라도 표현하지 않은 감정은 영원히 상상 속에 머물 뿐이며, 오늘의 솔직함이 예상보다 훨씬 좋은 결과를 가져올 것입니다.',
        en: 'The stars are bestowing a special blessing on your love today. If you have long hesitated to confess your feelings, today is precisely the optimal moment to summon that courage. Even if rejection feels frightening, unexpressed emotions stay forever only in imagination—today\'s honesty will bring results far better than you expect.',
        zh: '星星今天正在为你的爱情给予特别的祝福。如果你一直犹豫是否表白，今天正是鼓起那份勇气的最佳时机。即使害怕被拒绝，没有表达的感情永远只存在于想象中——今天的坦诚会带来比预期好得多的结果。',
        ja: '星々は今日あなたの恋に特別な祝福を降り注いでいます。長い間告白をためらっていたなら、今日こそその勇気を出す最適な瞬間です。拒絶が怖くても表現しない感情は永遠に想像の中に留まるだけで、今日の正直さが予想よりずっと良い結果をもたらすでしょう。',
        es: 'Las estrellas están otorgando una bendición especial a tu amor hoy. Si has dudado durante mucho tiempo en confesar tus sentimientos, hoy es precisamente el momento óptimo para reunir ese coraje. Aunque el rechazo parezca aterrador, las emociones no expresadas permanecen para siempre solo en la imaginación.',
      },
    ],
    medium: [
      {
        ko: '오늘은 폭풍 같은 감정보다 잔잔하고 따뜻한 사랑의 에너지가 흐르는 날입니다. 이런 평화로운 연애운은 큰 이벤트보다 사소한 일상 속 애정 표현이 더 오래 기억되는 날임을 의미합니다. 오늘 연인에게 작지만 진심 어린 한 가지를 해보세요—그 작은 행동이 신뢰를 쌓습니다.',
        en: 'Today flows with a calm, warm love energy rather than stormy emotions. This peaceful romantic energy means that small gestures of affection in ordinary daily moments are remembered far longer than grand events. Do one small but sincere thing for your loved one today—that small action builds trust.',
        zh: '今天流淌着平静温暖的爱情能量，而非暴风雨般的情感。这种平和的恋爱运意味着日常小小的爱意表达比大事件更令人难忘。今天为恋人做一件虽小但真诚的事吧——那个小小的行动会积累信任。',
        ja: '今日は嵐のような感情よりも穏やかで温かい愛のエネルギーが流れる日です。こんな平和な恋愛運は大きなイベントより些細な日常の中の愛情表現がより長く記憶される日であることを意味します。今日恋人に小さくても真心のこもった何か一つをしてみてください。',
        es: 'Hoy fluye una energía de amor tranquila y cálida en lugar de emociones tormentosas. Esta energía romántica pacífica significa que los pequeños gestos de afecto en los momentos cotidianos ordinarios se recuerdan mucho más que los grandes eventos. Haz una cosa pequeña pero sincera por tu ser querido hoy.',
      },
      {
        ko: '오늘 관계에서 가장 중요한 것은 서로를 있는 그대로 이해하려는 노력입니다. 상대가 완벽하지 않듯 당신도 완벽하지 않으며, 그 불완전함을 인정하고 받아들이는 순간 관계는 더 깊어집니다. 오늘 상대의 입장에서 한 번만 더 생각해보세요—이해가 사랑의 가장 깊은 형태입니다.',
        en: 'The most important thing in your relationship today is the effort to understand each other as you truly are. Just as your partner is not perfect, neither are you, and the moment you acknowledge and accept that imperfection, the relationship deepens. Try thinking from your partner\'s perspective one more time today—understanding is love\'s deepest form.',
        zh: '今天关系中最重要的是努力以本来面目理解彼此。就像对方不完美一样，你也不完美，承认并接受那种不完美的那一刻，关系会更加深厚。今天再从对方的角度想一想吧——理解是爱最深的形式。',
        ja: '今日関係において最も大切なのは、お互いをありのままに理解しようとする努力です。相手が完璧でないようにあなたも完璧ではなく、その不完全さを認めて受け入れた瞬間に関係はより深まります。今日相手の立場で一度だけ考えてみてください。',
        es: 'Lo más importante en tu relación hoy es el esfuerzo por entenderse mutuamente tal como son. Así como tu pareja no es perfecta, tampoco lo eres tú, y el momento en que reconoces y aceptas esa imperfección, la relación se profundiza. Intenta pensar desde la perspectiva de tu pareja una vez más hoy.',
      },
      {
        ko: '오늘 사랑의 에너지는 크게 요동치지 않지만, 그 고요함 속에 따뜻한 안정감이 담겨 있습니다. 사랑에도 봄날처럼 설레는 시기가 있고, 오늘처럼 포근한 가을 햇살 같은 시기가 있습니다. 지금 옆에 있는 사람의 존재 그 자체에 감사하는 마음을 가져보세요.',
        en: 'Today\'s love energy does not surge dramatically, but within that stillness lies a warm sense of security. Love has periods of spring-like excitement, and periods like today that feel like the gentle warmth of autumn sunlight. Take a moment to feel grateful for the mere presence of the person beside you.',
        zh: '今天爱情能量没有大幅波动，但那份平静中蕴含着温暖的安定感。爱情也有像春天一样令人心动的时期，以及像今天这样如温暖秋日阳光般的时期。对身边那个人的存在本身心怀感激吧。',
        ja: '今日の愛のエネルギーは大きく揺れ動きませんが、その静けさの中に温かい安定感が宿っています。愛にも春のようにときめく時期があり、今日のような温かい秋の陽射しのような時期があります。今そばにいる人の存在そのものに感謝する気持ちを持ってみてください。',
        es: 'La energía amorosa de hoy no surge dramáticamente, pero dentro de esa quietud hay una cálida sensación de seguridad. El amor tiene períodos de emoción primaveral, y períodos como el de hoy que se sienten como el cálido sol de otoño. Tómate un momento para sentirte agradecido por la mera presencia de la persona a tu lado.',
      },
      {
        ko: '급하게 변화를 추구하기보다 지금의 관계에서 신뢰를 더 쌓는 날로 삼는 것이 현명합니다. 신뢰는 하루아침에 만들어지지 않지만, 오늘처럼 조용한 날의 일관된 행동이 그 토대를 단단하게 합니다. 말보다 행동으로, 그리고 그 행동의 반복으로 사랑을 증명하세요.',
        en: 'Rather than urgently pursuing change, it is wise to make today a day for building deeper trust in your current relationship. Trust is not built overnight, but consistent behavior on quiet days like today solidifies its foundation. Prove your love through actions rather than words, and through the repetition of those actions.',
        zh: '与其急于寻求改变，不如把今天当作在现有关系中积累更多信任的日子，这才是明智之举。信任不是一朝一夕建立的，但像今天这样平静日子里的一贯行动会使其基础更加牢固。用行动而非言语，以及行动的重复来证明你的爱。',
        ja: '急激な変化を追い求めるより、今の関係でより信頼を積み重ねる日にすることが賢明です。信頼は一夜にして作られませんが、今日のような静かな日の一貫した行動がその土台を固めます。言葉より行動で、そしてその行動の繰り返しで愛を証明してください。',
        es: 'En lugar de buscar cambios urgentemente, es sabio hacer de hoy un día para construir una confianza más profunda en tu relación actual. La confianza no se construye de la noche a la mañana, pero el comportamiento consistente en días tranquilos como hoy solidifica su fundamento. Demuestra tu amor a través de acciones más que de palabras.',
      },
      {
        ko: '오늘 사랑에서 차분하고 여유 있는 태도를 유지하면, 상대방도 자연스럽게 편안함을 느끼고 마음이 열립니다. 서두르거나 압박을 주지 않는 사랑이 오히려 더 깊은 신뢰와 친밀감을 만들어냅니다. 오늘 하루 상대에게 충분한 공간과 여유를 선물해보세요.',
        en: 'When you maintain a calm and unhurried attitude in love today, your partner naturally feels comfortable and their heart opens. Love that does not rush or pressure paradoxically creates deeper trust and intimacy. Give your partner the gift of ample space and ease today.',
        zh: '今天在爱情中保持平静从容的态度，对方也会自然而然地感到舒适并敞开心扉。不急不催的爱反而会创造更深的信任和亲密感。今天给对方充足的空间和余裕作为礼物吧。',
        ja: '今日愛において落ち着いた余裕ある態度を維持すると、相手も自然と心地よさを感じ心が開かれます。急いだりプレッシャーをかけたりしない愛がむしろより深い信頼と親密さを生み出します。今日一日相手に十分な空間と余裕をプレゼントしてみてください。',
        es: 'Cuando mantienes una actitud tranquila y sin prisas en el amor hoy, tu pareja naturalmente se siente cómoda y su corazón se abre. El amor que no se apresura ni presiona crea paradójicamente una confianza e intimidad más profundas. Dale a tu pareja el regalo de espacio y tranquilidad amplios hoy.',
      },
    ],
    low: [
      {
        ko: '오늘 연애운이 다소 침체되어 있지만, 이것은 관계가 나빠진 것이 아니라 두 사람 모두 잠시 쉬어가는 시간이 필요하다는 신호일 수 있습니다. 갈등이 생기더라도 즉각적인 반응보다 잠시 마음을 가라앉힌 뒤 대화로 풀어가는 것이 훨씬 효과적입니다. 오늘 하루는 말보다 경청에 집중해보세요.',
        en: 'Today\'s love fortune is somewhat stagnant, but this may be a signal that both of you need a moment of rest rather than the relationship worsening. Even if conflict arises, calming yourself first and then resolving it through conversation is far more effective than immediate reaction. Focus on listening rather than speaking today.',
        zh: '今天恋爱运有些低迷，但这可能是个信号，说明两人都需要暂时休息一下，而不是关系变差了。即使产生冲突，先平静一下心情再通过对话解决也比立即反应有效得多。今天专注于倾听而非说话吧。',
        ja: '今日恋愛運がやや低迷していますが、これは関係が悪化したのではなく、二人ともしばらく休む時間が必要というサインかもしれません。衝突が生じても即座な反応よりしばらく心を落ち着かせてから対話で解決する方がずっと効果的です。今日は話すより聞くことに集中してみてください。',
        es: 'La fortuna amorosa de hoy está algo estancada, pero esto puede ser una señal de que ambos necesitan un momento de descanso más que un empeoramiento de la relación. Incluso si surge un conflicto, calmarse primero y luego resolverlo a través de la conversación es mucho más efectivo que la reacción inmediata. Enfócate en escuchar más que en hablar hoy.',
      },
      {
        ko: '오늘은 작은 말 한 마디가 뜻하지 않게 오해를 낳기 쉬운 날입니다. 상대방의 감정이 평소보다 민감해져 있을 수 있으니, 말 한 마디 한 마디를 조금 더 신중하게 고르는 것이 좋습니다. 넘치는 말보다 따뜻한 침묵과 공감 어린 눈빛이 오늘 더 많은 것을 전달할 수 있습니다.',
        en: 'Today a small word can easily create unintended misunderstandings. Your partner\'s emotions may be more sensitive than usual, so it is better to choose each word a little more carefully. Warm silence and empathetic eye contact can communicate far more than an abundance of words today.',
        zh: '今天一句小小的话很容易产生意想不到的误解。对方的情绪可能比平时更敏感，所以更谨慎地选择每一句话比较好。今天温暖的沉默和充满共情的眼神能传递的比大量言语更多。',
        ja: '今日は小さな言葉一つが思いがけず誤解を生みやすい日です。相手の感情が普段より敏感になっているかもしれないので、言葉一つ一つをもう少し慎重に選ぶことがよいでしょう。あふれる言葉より温かい沈黙と共感のこもった眼差しが今日はより多くを伝えることができます。',
        es: 'Hoy una pequeña palabra puede crear fácilmente malentendidos no intencionados. Las emociones de tu pareja pueden ser más sensibles de lo usual, así que es mejor elegir cada palabra con un poco más de cuidado. El silencio cálido y el contacto visual empático pueden comunicar mucho más que una abundancia de palabras hoy.',
      },
      {
        ko: '오늘은 감정이 앞서기 쉬운 날이지만, 감정에 이끌린 결정은 나중에 후회를 남길 수 있습니다. 지금 이 순간의 감정이 전부인 것처럼 느껴지더라도, 잠시 뒤로 물러서 더 넓은 시각으로 관계를 바라보는 것이 필요합니다. 오늘 중요한 결정은 감정이 가라앉은 뒤로 미루는 것이 현명합니다.',
        en: 'Emotions are easy to let get ahead of you today, but decisions driven by feelings can leave regret later. Even if this moment\'s emotion feels like everything, it is necessary to step back and view the relationship from a broader perspective. Postponing important decisions until your emotions have settled is wise today.',
        zh: '今天情绪容易主导，但被情绪驱动的决定可能会留下遗憾。即使此刻的情感感觉像是一切，也需要暂时退后，从更宏观的视角看待关系。今天把重要决定推迟到情绪平静之后是明智的。',
        ja: '今日は感情が先走りやすい日ですが、感情に導かれた決断は後で後悔を残すことがあります。今この瞬間の感情がすべてのように感じられても、少し後退してより広い視点で関係を見ることが必要です。今日重要な決断は感情が落ち着いてから後回しにする方が賢明です。',
        es: 'Las emociones son fáciles de dejar que se adelanten hoy, pero las decisiones impulsadas por sentimientos pueden dejar arrepentimiento después. Incluso si la emoción de este momento se siente como todo, es necesario dar un paso atrás y ver la relación desde una perspectiva más amplia. Posponer decisiones importantes hasta que tus emociones se asienten es sabio hoy.',
      },
      {
        ko: '오늘은 관계의 소음에서 잠시 벗어나 자신만의 공간과 시간이 필요한 날입니다. 사랑하기 때문에 항상 함께해야 한다는 압박은 오히려 관계를 지치게 만들 수 있습니다. 혼자만의 시간을 통해 자신을 재발견하고, 그 충만함으로 관계로 돌아오세요.',
        en: 'Today you need your own space and time, briefly stepping away from the noise of the relationship. The pressure that loving someone means always being together can paradoxically exhaust the relationship. Rediscover yourself through solitary time, and return to the relationship filled with that wholeness.',
        zh: '今天你需要暂时从关系的喧嚣中抽身，拥有自己的空间和时间。因为相爱就必须时刻在一起的压力反而可能让关系变得疲惫。通过独处时间重新发现自己，然后带着那份圆满回到关系中。',
        ja: '今日は関係の喧騒から少し離れて自分だけの空間と時間が必要な日です。愛しているから常に一緒にいなければならないというプレッシャーがむしろ関係を疲弊させることがあります。一人の時間を通じて自分を再発見し、その充実感で関係に戻ってきてください。',
        es: 'Hoy necesitas tu propio espacio y tiempo, alejándote brevemente del ruido de la relación. La presión de que amar a alguien significa estar siempre juntos puede paradójicamente agotar la relación. Reencuéntrate a ti mismo a través del tiempo en soledad, y regresa a la relación lleno de esa plenitud.',
      },
      {
        ko: '오늘은 관계에서 잠시 거리를 두는 것이 오히려 두 사람 모두에게 필요한 쉼표가 됩니다. 지나치게 가까워지려 하면 오히려 서로의 숨통을 막는 경우가 있으며, 적절한 거리가 건강한 관계의 비결입니다. 오늘 서로에게 충분한 여유를 주면, 내일 다시 만날 때 더 따뜻하게 반길 수 있습니다.',
        en: 'Taking some distance in the relationship today actually becomes the necessary breathing room for both of you. Getting too close can sometimes suffocate each other, and the right amount of space is the secret of a healthy relationship. Give each other sufficient breathing room today, and you will be able to greet each other more warmly when you meet again tomorrow.',
        zh: '今天在关系中暂时保持距离，反而成为两个人都需要的休止符。过于想要亲近有时反而会让彼此窒息，适当的距离是健康关系的秘诀。今天给彼此充分的空间，明天再次相见时就能更温暖地迎接对方。',
        ja: '今日関係において少し距離を置くことが、むしろ二人ともに必要な休符になります。近づきすぎようとするとかえってお互いの息の根を止めることがあり、適切な距離が健全な関係の秘訣です。今日お互いに十分な余裕を与えると、明日再び会うときにより温かく迎えられます。',
        es: 'Tomar algo de distancia en la relación hoy en realidad se convierte en el espacio para respirar necesario para ambos. Acercarse demasiado a veces puede asfixiarse mutuamente, y la cantidad adecuada de espacio es el secreto de una relación saludable. Dense suficiente espacio hoy, y podrán saludarse más calurosamente cuando se encuentren mañana.',
      },
    ],
  },
  career: {
    high: [
      {
        ko: '오늘은 평소보다 훨씬 날카로운 집중력과 실행력이 발휘되는 날입니다. 당신이 그동안 쌓아온 역량이 오늘 하루 완벽하게 발현될 준비가 되어 있으며, 상사나 동료들도 오늘의 당신을 다르게 바라볼 것입니다. 망설이지 말고 먼저 손을 들고, 먼저 목소리를 내세요—오늘의 적극성이 커리어의 분기점이 됩니다.',
        en: 'Today your focus and execution are sharper than usual by a significant margin. The capabilities you have been building are perfectly primed to express themselves today, and your superiors and colleagues will see you differently. Do not hesitate—raise your hand first, speak up first. Today\'s proactiveness becomes a turning point in your career.',
        zh: '今天你的专注力和执行力比平时要强得多。你长期积累的能力今天做好了完美呈现的准备，上司和同事也会对今天的你刮目相看。不要犹豫，第一个举手，第一个发声——今天的积极主动将成为职业生涯的转折点。',
        ja: '今日は普段よりずっと鋭い集中力と実行力が発揮される日です。これまで積み上げてきた能力が今日完璧に発揮される準備ができており、上司や同僚も今日のあなたを違った目で見るでしょう。ためらわずに先に手を挙げ、先に声を上げてください。',
        es: 'Hoy tu concentración y ejecución son significativamente más agudas de lo usual. Las capacidades que has estado construyendo están perfectamente preparadas para expresarse hoy, y tus superiores y colegas te verán de manera diferente. No dudes—levanta la mano primero, habla primero. La proactividad de hoy se convierte en un punto de inflexión en tu carrera.',
      },
      {
        ko: '오늘은 당신의 노력이 공식적으로 인정받을 가능성이 높은 날입니다. 승진, 좋은 평가, 중요한 프로젝트 배정 등 커리어를 한 단계 올려줄 기회가 가까이 있습니다. 숨어 있지 말고 오늘만큼은 자신이 해온 것들을 당당하게 드러내세요—보여지지 않는 노력은 보상받기 어렵습니다.',
        en: 'Today there is a high likelihood that your efforts will receive official recognition. A career-advancing opportunity such as a promotion, excellent evaluation, or important project assignment is close by. Do not hide—show what you have accomplished with confidence today, because efforts that are not seen are difficult to reward.',
        zh: '今天你的努力很可能得到正式认可。晋升、好评、重要项目分配等提升职业生涯的机会就在眼前。不要躲藏，今天要理直气壮地展示自己的成就——看不见的努力很难得到回报。',
        ja: '今日はあなたの努力が公式に認められる可能性が高い日です。昇進、良い評価、重要なプロジェクトの配置など、キャリアを一段階上げてくれるチャンスが近くにあります。隠れていないで今日は自分がやってきたことを堂々と示してください。',
        es: 'Hoy hay una alta probabilidad de que tus esfuerzos reciban reconocimiento oficial. Una oportunidad de avance profesional como un ascenso, excelente evaluación o asignación de proyecto importante está cerca. No te escondas—muestra lo que has logrado con confianza hoy, porque los esfuerzos que no se ven son difíciles de recompensar.',
      },
      {
        ko: '오늘 당신의 창의적인 아이디어가 주목받을 준비가 되어 있습니다. 평소에 혼자서만 생각하던 아이디어, 아직 말하지 못한 더 나은 방법이 있다면 오늘이 꺼내놓을 최적의 타이밍입니다. 아이디어의 가치는 표현될 때만 인정받으며, 오늘 당신의 발상이 팀 전체를 움직일 수 있습니다.',
        en: 'Today your creative ideas are ready to receive attention. If you have been quietly nurturing ideas or better methods you have not yet shared, today is the optimal moment to bring them out. The value of an idea is only recognized when expressed, and your idea today could move the entire team.',
        zh: '今天你的创意想法准备好受到关注了。如果有一直独自思考的想法、还没说出口的更好方法，今天就是拿出来的最佳时机。想法的价值只有在表达时才能被认可，今天你的创意可能会推动整个团队。',
        ja: '今日はあなたの創造的なアイデアが注目される準備ができています。普段一人で考えていたアイデア、まだ言えていないより良い方法があれば今日が取り出す最適なタイミングです。アイデアの価値は表現された時だけ認められ、今日あなたの発想がチーム全体を動かすことができます。',
        es: 'Hoy tus ideas creativas están listas para recibir atención. Si has estado nutriendo silenciosamente ideas o mejores métodos que aún no has compartido, hoy es el momento óptimo para sacarlos. El valor de una idea solo se reconoce cuando se expresa, y tu idea hoy podría mover a todo el equipo.',
      },
      {
        ko: '오늘은 혼자 잘하는 것보다 함께 잘하는 것이 훨씬 강력한 결과를 만드는 날입니다. 동료들의 강점을 살리고 서로의 부족한 부분을 채워주는 협력이 예상치 못한 높은 성과로 이어집니다. 오늘 팀의 힘을 믿고 의지해보세요—위대한 성과는 언제나 혼자가 아닌 함께에서 나옵니다.',
        en: 'Today working well together produces results dramatically more powerful than working well alone. Collaboration that leverages each colleague\'s strengths and fills in each other\'s gaps leads to unexpectedly high performance. Trust and lean on the power of your team today—great achievements always come from together, not alone.',
        zh: '今天一起做好远比独自做好能产生更强大的结果。发挥各同事的优势并互补不足的合作会带来意想不到的高成果。今天相信并依靠团队的力量吧——伟大的成就始终来自共同努力而非单打独斗。',
        ja: '今日は一人でうまくやるより一緒にうまくやる方がずっと強力な結果を生む日です。同僚の強みを活かしてお互いの不足な部分を補い合う協力が予想外の高い成果につながります。今日チームの力を信じて頼ってみてください。',
        es: 'Hoy trabajar bien juntos produce resultados dramáticamente más poderosos que trabajar bien solo. La colaboración que aprovecha las fortalezas de cada colega y llena las brechas de cada uno lleva a un rendimiento inesperadamente alto. Confía y apóyate en el poder de tu equipo hoy—los grandes logros siempre vienen de juntos, no solo.',
      },
      {
        ko: '오늘은 당신의 리더십이 자연스럽게 드러나고 주변에서 그것을 원하는 날입니다. 리더는 직책이 아니라 행동으로 만들어지며, 오늘 먼저 방향을 제시하고 팀을 이끄는 당신의 모습이 주위를 변화시킬 것입니다. 불확실한 상황에서 자신감 있게 한 발 앞서 나아가세요—팀은 그런 사람을 따릅니다.',
        en: 'Today your leadership emerges naturally and people around you are ready for it. Leaders are made through action rather than title, and the sight of you setting direction first and guiding the team today will transform those around you. Step forward with confidence in uncertain situations—teams follow people like that.',
        zh: '今天你的领导力自然展现，周围的人也需要它。领导者不是由职位而是由行动造就的，今天你率先指引方向、带领团队的样子将会改变周围的人。在不确定的情况下自信地迈出一步——团队会追随这样的人。',
        ja: '今日はあなたのリーダーシップが自然に現れ、周囲がそれを求める日です。リーダーは肩書ではなく行動で作られ、今日先に方向を示してチームを導くあなたの姿が周囲を変えるでしょう。不確かな状況で自信を持って一歩先に踏み出してください。',
        es: 'Hoy tu liderazgo emerge naturalmente y las personas a tu alrededor están listas para ello. Los líderes se hacen a través de la acción más que del título, y la imagen de ti estableciendo la dirección primero y guiando al equipo hoy transformará a quienes te rodean. Da un paso al frente con confianza en situaciones inciertas.',
      },
    ],
    medium: [
      {
        ko: '오늘 업무는 큰 기복 없이 안정적으로 흘러갈 것입니다. 이런 날일수록 계획한 것들을 차분하게 하나씩 처리하면, 생각보다 많은 일을 마무리할 수 있습니다. 꾸준함이 탁월함보다 강한 날이므로 계획대로 한 발씩 나아가세요.',
        en: 'Work today will flow stably without major ups and downs. On days like this, calmly processing your planned tasks one by one will let you complete more than you expect. Steadiness outperforms brilliance today, so proceed step by step according to your plan.',
        zh: '今天工作将会平稳流畅，没有大起大落。这样的日子里，冷静地一件件处理计划好的事情，能完成比想象中更多的工作。今天稳定比卓越更有力，按计划一步步前进吧。',
        ja: '今日の業務は大きな浮き沈みなく安定して流れるでしょう。こんな日こそ計画したことを落ち着いて一つずつ処理すると、思ったより多くのことを片付けられます。今日は着実さが卓越さより強い日なので、計画通りに一歩ずつ進んでください。',
        es: 'El trabajo hoy fluirá establemente sin grandes altibajos. En días así, procesar calmadamente tus tareas planificadas una por una te permitirá completar más de lo que esperas. La constancia supera a la brillantez hoy, así que avanza paso a paso según tu plan.',
      },
      {
        ko: '오늘은 큰 도전보다 꾸준한 노력이 더 빛나는 날입니다. 당장 화려한 성과가 보이지 않더라도 오늘 당신이 쌓고 있는 것들이 미래의 단단한 기반이 되고 있습니다. 결과가 느리게 온다고 조급해하지 마세요—모든 결실은 충분한 준비 끝에 찾아옵니다.',
        en: 'Today steady effort shines more brightly than dramatic challenges. Even if impressive results are not yet visible, what you are building today is becoming the solid foundation of your future. Do not feel impatient if results come slowly—every fruit arrives after sufficient preparation.',
        zh: '今天稳定的努力比重大挑战更闪耀。即使现在看不到华丽的成果，你今天积累的东西正在成为未来坚实的基础。不要因结果来得慢而焦急——所有的收获都在充分准备之后到来。',
        ja: '今日は大きな挑戦より着実な努力が輝く日です。すぐに派手な成果が見えなくても、今日あなたが積み上げていることが未来のしっかりした基盤になっています。結果がゆっくり来ると焦らないでください—すべての実りは十分な準備の末に訪れます。',
        es: 'Hoy el esfuerzo constante brilla más que los desafíos dramáticos. Aunque los resultados impresionantes aún no sean visibles, lo que estás construyendo hoy se está convirtiendo en la base sólida de tu futuro. No te impacientes si los resultados llegan lentamente—todo fruto llega después de suficiente preparación.',
      },
      {
        ko: '오늘의 일상적인 업무 속에서도 작은 만족감을 발견하면, 그것이 장기적인 동기를 유지하는 가장 강력한 방법입니다. 모든 날이 극적이지 않아도 괜찮으며, 평범한 하루를 성실하게 보내는 것 자체가 이미 성공입니다. 오늘 한 가지 업무를 완벽하게 마무리하는 데서 성취감을 찾아보세요.',
        en: 'Finding small satisfaction even within today\'s routine work is the most powerful way to maintain long-term motivation. Not every day needs to be dramatic, and spending an ordinary day with sincerity is already success in itself. Try finding a sense of achievement in completing one task perfectly today.',
        zh: '即使在今天的日常工作中发现小小的满足感，也是维持长期动力最有力的方法。不是每天都需要戏剧性的，认真度过平凡的一天本身就已经是成功。今天试着从完美完成一项工作中找到成就感吧。',
        ja: '今日の日常的な業務の中でも小さな満足感を見つけると、それが長期的なモチベーションを維持する最も強力な方法です。すべての日が劇的でなくてもよく、平凡な一日を誠実に過ごすこと自体がすでに成功です。今日一つの業務を完璧に仕上げることに達成感を見つけてみてください。',
        es: 'Encontrar pequeña satisfacción incluso dentro del trabajo rutinario de hoy es la forma más poderosa de mantener la motivación a largo plazo. No todos los días necesitan ser dramáticos, y pasar un día ordinario con sinceridad es ya éxito en sí mismo. Intenta encontrar una sensación de logro al completar una tarea perfectamente hoy.',
      },
      {
        ko: '오늘은 무리하게 속도를 올리기보다 지금의 페이스를 안정적으로 유지하는 것이 가장 현명한 전략입니다. 번아웃은 갑자기 오는 것이 아니라 작은 무리의 축적에서 시작되며, 오늘 자신의 한계를 존중하는 것이 내일의 지속 가능한 성과를 만듭니다. 지금 속도가 충분히 좋습니다.',
        en: 'Today the wisest strategy is to maintain your current pace stably rather than pushing it harder. Burnout does not arrive suddenly—it begins from the accumulation of small overexertions, and respecting your limits today creates tomorrow\'s sustainable performance. Your current pace is already good enough.',
        zh: '今天最明智的策略是稳定保持现在的节奏，而非强行提速。职业倦怠不是突然来临的，而是从小小的过度积累开始，今天尊重自己的极限才能创造明天可持续的成果。现在的速度已经够好了。',
        ja: '今日は無理に速度を上げるより今のペースを安定して維持することが最も賢明な戦略です。バーンアウトは突然来るのではなく小さな無理の蓄積から始まり、今日自分の限界を尊重することが明日の持続可能な成果を作ります。今の速度で十分です。',
        es: 'Hoy la estrategia más sabia es mantener tu ritmo actual establemente en lugar de empujarlo más. El agotamiento no llega repentinamente—comienza desde la acumulación de pequeños excesos, y respetar tus límites hoy crea el rendimiento sostenible de mañana. Tu ritmo actual ya es suficientemente bueno.',
      },
      {
        ko: '오늘 작은 목표 하나를 설정하고 그것을 달성하는 과정을 즐겨보세요. 큰 성공은 언제나 작은 성공들의 집합이며, 오늘 체크리스트 하나를 지우는 그 순간의 만족감이 내일의 더 큰 목표로 향하는 동기를 만듭니다. 작은 것부터 완성하는 습관이 탁월함의 기반입니다.',
        en: 'Set one small goal today and enjoy the process of achieving it. Great success is always the sum of small successes, and the satisfaction of checking off a single item today creates the motivation to reach tomorrow\'s larger goals. The habit of completing small things first is the foundation of excellence.',
        zh: '今天设定一个小目标，享受实现它的过程。大成功始终是小成功的集合，今天划掉一个清单项那一刻的满足感，会创造出迈向明天更大目标的动力。先完成小事的习惯是卓越的基础。',
        ja: '今日小さな目標一つを設定して、それを達成するプロセスを楽しんでみてください。大きな成功はいつも小さな成功の集合であり、今日チェックリスト一つを消す瞬間の満足感が明日のより大きな目標へ向かう動機を作ります。小さなことから完成させる習慣が卓越さの基盤です。',
        es: 'Establece una pequeña meta hoy y disfruta el proceso de lograrla. El gran éxito siempre es la suma de pequeños éxitos, y la satisfacción de tachar un solo elemento hoy crea la motivación para alcanzar las metas más grandes de mañana. El hábito de completar primero las cosas pequeñas es la base de la excelencia.',
      },
    ],
    low: [
      {
        ko: '오늘 업무에서 예상치 못한 장벽이 나타날 수 있지만, 이 장벽은 당신을 막기 위한 것이 아니라 더 나은 해결책을 찾도록 유도하는 것일 수 있습니다. 불편한 상황에서도 인내심을 잃지 말고, 지금 당장 해결되지 않아도 괜찮다는 여유를 가져보세요. 오늘의 어려움을 통과하고 나면 더 단단한 문제 해결 능력이 남습니다.',
        en: 'Unexpected barriers may appear at work today, but these barriers may not be meant to stop you—they may be guiding you toward a better solution. Even in uncomfortable situations, do not lose patience, and allow yourself the ease of knowing it is okay if things are not resolved right away. After passing through today\'s difficulty, stronger problem-solving ability will remain.',
        zh: '今天工作中可能会出现意想不到的障碍，但这些障碍可能不是为了阻止你，而是引导你找到更好的解决方案。即使在不舒适的情况下也不要失去耐心，给自己一份从容——不立刻解决也没关系。经历今天的困难之后，会留下更强的解决问题的能力。',
        ja: '今日仕事で予想外の障壁が現れることがあるかもしれませんが、この障壁はあなたを止めるためではなく、より良い解決策を見つけるよう導くものかもしれません。不快な状況でも忍耐心を失わず、今すぐ解決しなくてもいいという余裕を持ってみてください。今日の困難を通過した後にはより強い問題解決能力が残ります。',
        es: 'Pueden aparecer barreras inesperadas en el trabajo hoy, pero estas barreras pueden no estar destinadas a detenerte—pueden estar guiándote hacia una mejor solución. Incluso en situaciones incómodas, no pierdas la paciencia, y permítete la facilidad de saber que está bien si las cosas no se resuelven de inmediato.',
      },
      {
        ko: '오늘은 중요한 결정을 서두르기보다 더 많은 정보와 시간을 확보하는 것이 현명합니다. 성급하게 결정했다가 나중에 수정해야 하는 비용이, 오늘 조금 기다리는 비용보다 훨씬 클 수 있습니다. 결정을 미루는 것은 나약함이 아니라, 더 나은 결과를 위한 전략적 인내입니다.',
        en: 'Today it is wiser to secure more information and time rather than rushing an important decision. The cost of deciding hastily and having to correct it later can be far greater than the cost of waiting a little today. Postponing a decision is not weakness—it is strategic patience for a better outcome.',
        zh: '今天与其急于做出重要决定，不如争取更多信息和时间，这才是明智的。仓促决定后需要修正的代价，可能远大于今天稍等一下的代价。推迟决定不是软弱，而是为了更好结果的战略性耐心。',
        ja: '今日は重要な決定を急ぐより多くの情報と時間を確保することが賢明です。急いで決定して後で修正しなければならないコストが、今日少し待つコストよりずっと大きいかもしれません。決定を延ばすことは弱さではなく、より良い結果のための戦略的な忍耐です。',
        es: 'Hoy es más sabio asegurar más información y tiempo en lugar de apresurar una decisión importante. El costo de decidir apresuradamente y tener que corregirlo después puede ser mucho mayor que el costo de esperar un poco hoy. Posponer una decisión no es debilidad—es paciencia estratégica para un mejor resultado.',
      },
      {
        ko: '오늘은 직장 내 인간관계에서 작은 마찰이 생길 수 있는 날입니다. 감정적으로 반응하는 순간 상황이 더 복잡해질 수 있으므로, 한 박자 숨을 고르고 이성적으로 대응하는 것이 중요합니다. 오늘의 갈등을 부드럽게 처리하는 능력이 당신의 진정한 프로페셔널리즘을 보여줍니다.',
        en: 'Small friction in workplace relationships may arise today. The moment you respond emotionally, the situation can become more complicated, so taking a breath and responding rationally is important. The ability to handle today\'s friction gently demonstrates your true professionalism.',
        zh: '今天职场人际关系中可能会产生小摩擦。情绪化回应的那一刻情况可能会变得更复杂，所以喘口气、理性应对很重要。今天温和处理冲突的能力展现了你真正的专业素养。',
        ja: '今日は職場内の人間関係で小さな摩擦が生じることがある日です。感情的に反応した瞬間状況がより複雑になる可能性があるので、一拍息を整えて理性的に対応することが大切です。今日の摩擦を穏やかに処理する能力があなたの真のプロフェッショナリズムを示します。',
        es: 'Puede surgir pequeña fricción en las relaciones laborales hoy. En el momento en que respondes emocionalmente, la situación puede volverse más complicada, por lo que tomar un respiro y responder racionalmente es importante. La capacidad de manejar suavemente la fricción de hoy demuestra tu verdadero profesionalismo.',
      },
      {
        ko: '오늘 업무 스트레스가 평소보다 높을 수 있습니다. 그러나 스트레스는 당신이 중요한 일을 하고 있다는 신호이기도 하며, 그것을 잘 관리하는 것이 고성과자의 특징입니다. 적절한 휴식을 취하고, 잠시 자리에서 일어나 몸을 움직여보세요—짧은 휴식이 생산성을 높입니다.',
        en: 'Work stress today may be higher than usual. However, stress is also a signal that you are doing important work, and managing it well is a hallmark of high performers. Take appropriate rest, and stand up briefly and move your body—short breaks raise productivity.',
        zh: '今天工作压力可能比平时高。但压力也是你在做重要工作的信号，善加管理是高绩效者的特征。适当休息，起来活动一下身体——短暂的休息能提高生产力。',
        ja: '今日は仕事のストレスが普段より高いかもしれません。しかしストレスはあなたが重要な仕事をしているというサインでもあり、それをうまく管理することが高いパフォーマンスを発揮する人の特徴です。適切な休息を取り、少し席を立って体を動かしてみてください。',
        es: 'El estrés laboral hoy puede ser más alto de lo usual. Sin embargo, el estrés también es una señal de que estás haciendo trabajo importante, y gestionarlo bien es una característica de los de alto rendimiento. Toma descanso apropiado, y levántate brevemente y mueve tu cuerpo—los descansos cortos aumentan la productividad.',
      },
      {
        ko: '오늘은 실수가 생기기 쉬운 환경이므로, 평소보다 한 번 더 확인하는 습관이 당신을 지킬 것입니다. 작은 실수가 큰 문제로 이어지는 것은 대부분 확인의 부재에서 비롯되며, 꼼꼼함은 느린 것이 아니라 오히려 더 빠른 길입니다. 오늘 하루, 서두르기보다 정확하게 가는 것을 선택하세요.',
        en: 'Today\'s environment makes mistakes more likely, so the habit of double-checking will protect you. Most cases where small mistakes grow into big problems come from the absence of verification, and being thorough is not slow—it is actually the faster path. Choose accuracy over speed today.',
        zh: '今天容易出错，所以比平时多检查一遍的习惯会保护你。小失误演变成大问题，大多源于缺乏核查，细致不是慢，反而是更快的路。今天选择准确而非速度。',
        ja: '今日はミスが生じやすい環境なので、普段より一度多く確認する習慣があなたを守るでしょう。小さなミスが大きな問題につながるのはほとんどが確認の不在から来ており、丁寧さは遅いのではなくむしろより速い道です。今日一日、急ぐより正確に行くことを選んでください。',
        es: 'El entorno de hoy hace que los errores sean más probables, por lo que el hábito de verificar dos veces te protegerá. La mayoría de los casos donde los pequeños errores se convierten en grandes problemas provienen de la ausencia de verificación, y ser minucioso no es lento—es en realidad el camino más rápido. Elige precisión sobre velocidad hoy.',
      },
    ],
  },
  health: {
    high: [
      {
        ko: '오늘은 몸과 마음이 최고의 조화를 이루는 날입니다. 평소에는 무겁게 느껴지던 운동이나 활동도 오늘은 즐겁고 가볍게 느껴질 것이며, 그 에너지를 최대한 활용할수록 몸이 더 빛납니다. 오늘 새로운 건강 루틴을 시작하거나, 평소보다 조금 더 움직여보세요—이런 활력의 날은 흘려보내기에는 너무 아깝습니다.',
        en: 'Today your body and mind reach their finest harmony. Exercise or activities that usually feel heavy will feel enjoyable and light today, and the more you leverage that energy, the more your body shines. Start a new health routine or move a little more than usual today—a day of vitality like this is too precious to let slip by.',
        zh: '今天身心达到最佳和谐状态。平时感觉沉重的运动或活动今天会感觉愉快轻盈，越充分利用这份能量身体就越闪耀。今天开始新的健康习惯，或比平时多动一点——这样充满活力的日子太珍贵了，不能白白错过。',
        ja: '今日は体と心が最高の調和を成す日です。普段は重く感じていた運動や活動も今日は楽しく軽く感じられ、そのエネルギーを最大限活用するほど体が輝きます。今日新しい健康ルーティンを始めるか、普段より少し多く動いてみてください。',
        es: 'Hoy tu cuerpo y mente alcanzan su mejor armonía. El ejercicio o actividades que usualmente se sienten pesados se sentirán agradables y ligeros hoy, y cuanto más aproveches esa energía, más brillará tu cuerpo. Comienza una nueva rutina de salud o muévete un poco más de lo usual hoy.',
      },
      {
        ko: '오늘은 몸의 방어력이 높아진 날입니다. 건강한 식사, 충분한 수분, 적절한 움직임이라는 세 가지 기본이 오늘 유독 강력한 효과를 발휘합니다. 이 좋은 흐름을 타고 건강한 습관을 하나 더 추가해보세요—오늘 시작한 습관이 가장 오래 지속됩니다.',
        en: 'Your body\'s defenses are heightened today. The three basics of healthy eating, sufficient hydration, and appropriate movement work with unusually powerful effect today. Ride this good flow and add one more healthy habit—habits started today last the longest.',
        zh: '今天身体的防御力增强了。健康饮食、充足水分和适当运动这三个基本要素今天发挥着格外强大的效果。乘着这股好势头再增加一个健康习惯吧——今天开始的习惯持续得最久。',
        ja: '今日は体の防御力が高まった日です。健康的な食事、十分な水分、適切な動きという三つの基本が今日は特に強力な効果を発揮します。この良い流れに乗って健康な習慣をもう一つ追加してみてください。',
        es: 'Las defensas de tu cuerpo están elevadas hoy. Los tres básicos de alimentación saludable, hidratación suficiente y movimiento apropiado funcionan con efecto inusualmente poderoso hoy. Monta esta buena corriente y añade un hábito saludable más—los hábitos comenzados hoy duran más.',
      },
      {
        ko: '몸과 마음이 고요하게 정렬된 날입니다. 이런 날일수록 명상, 요가, 혹은 조용한 자연 속 산책이 평소보다 훨씬 깊은 평온함을 선사합니다. 오늘 단 10분이라도 자신만의 고요한 시간을 갖는다면, 그 효과는 한 시간의 휴식보다 클 것입니다.',
        en: 'Your body and mind are quietly aligned today. On days like this, meditation, yoga, or a quiet walk in nature bestows a depth of peace far beyond the usual. Even just 10 minutes of your own quiet time today will have an effect greater than an hour of ordinary rest.',
        zh: '今天身心静静地对齐了。这样的日子里，冥想、瑜伽或在大自然中安静散步能带来比平时更深的宁静。今天哪怕只有10分钟属于自己的安静时间，效果也会比一小时普通休息更大。',
        ja: '体と心が静かに整った日です。こんな日こそ瞑想、ヨガ、あるいは静かな自然の中の散歩が普段よりずっと深い平穏をもたらします。今日たった10分でも自分だけの静かな時間を持てば、その効果は1時間の休息より大きいでしょう。',
        es: 'Tu cuerpo y mente están quietamente alineados hoy. En días así, la meditación, el yoga, o una caminata tranquila en la naturaleza otorga una profundidad de paz muy superior a la usual. Incluso solo 10 minutos de tu propio tiempo tranquilo hoy tendrá un efecto mayor que una hora de descanso ordinario.',
      },
      {
        ko: '오늘은 새로운 건강 습관이나 운동을 시작하기에 이보다 좋은 날이 없습니다. 몸이 변화를 받아들일 준비가 되어 있으며, 오늘 처음 시작하는 것들이 빠르게 습관으로 자리잡을 것입니다. 완벽한 준비를 기다리지 말고 지금 당장 첫 발을 내딛으세요—시작이 반입니다.',
        en: 'There is no better day than today to start a new health habit or exercise routine. Your body is ready to accept change, and the things you start today will take root as habits quickly. Do not wait for perfect preparation—take the first step right now. Starting is half the battle.',
        zh: '今天是开始新健康习惯或运动的绝佳日子。身体已经准备好接受改变，今天开始的事情会很快成为习惯。不要等待完美的准备，现在就迈出第一步——开始就是成功的一半。',
        ja: '今日は新しい健康習慣や運動を始めるのにこれ以上ない日です。体が変化を受け入れる準備ができており、今日初めて始めるものが素早く習慣として定着するでしょう。完璧な準備を待たずに今すぐ最初の一歩を踏み出してください。',
        es: 'No hay mejor día que hoy para comenzar un nuevo hábito de salud o rutina de ejercicio. Tu cuerpo está listo para aceptar el cambio, y las cosas que empiezas hoy se arraizarán como hábitos rápidamente. No esperes la preparación perfecta—da el primer paso ahora mismo. Comenzar es la mitad de la batalla.',
      },
      {
        ko: '오늘은 몸의 회복력이 절정에 달한 날입니다. 최근 몸의 피로나 작은 불편함이 있었다면, 오늘 충분한 영양과 적절한 움직임으로 빠르게 회복될 것입니다. 지금 이 회복의 기운을 타고 건강 목표를 구체적으로 설정해보세요—오늘 세운 목표는 이루어질 힘이 있습니다.',
        en: 'Today your body\'s recovery power is at its peak. If you have had physical fatigue or minor discomfort recently, it will recover quickly with sufficient nutrition and appropriate movement today. Ride this current of recovery and set specific health goals—the goals you set today have the power to be realized.',
        zh: '今天身体的恢复力达到顶峰。如果最近有身体疲劳或小不适，今天通过充足的营养和适当的运动会迅速恢复。乘着这股恢复之势具体设定健康目标吧——今天设定的目标有实现的力量。',
        ja: '今日は体の回復力が絶頂に達した日です。最近体の疲れや小さな不調があったなら、今日十分な栄養と適切な動きで素早く回復するでしょう。今この回復の気運に乗って健康目標を具体的に設定してみてください。',
        es: 'Hoy el poder de recuperación de tu cuerpo está en su punto máximo. Si has tenido fatiga física o pequeñas molestias recientemente, se recuperará rápidamente con nutrición suficiente y movimiento apropiado hoy. Monta esta corriente de recuperación y establece metas de salud específicas.',
      },
    ],
    medium: [
      {
        ko: '오늘 건강 상태는 전반적으로 안정적인 흐름입니다. 이런 평온한 날이야말로 극단적인 다이어트나 과도한 운동보다 규칙적이고 균형 잡힌 생활을 실천하기에 가장 좋은 날입니다. 오늘 하루 일상의 건강 루틴을 충실히 지키는 것만으로도 당신의 몸은 충분히 감사할 것입니다.',
        en: 'Your health condition today flows in a generally stable pattern. Peaceful days like this are actually the best time to practice regular, balanced living rather than extreme diets or excessive exercise. Simply faithfully keeping your daily health routine today will be enough for your body to be grateful.',
        zh: '今天健康状态整体保持稳定的流动。这样平静的日子，比起极端节食或过度运动，正是实践规律均衡生活的最好时机。今天只需忠实地维持日常健康习惯，你的身体就已经足够感谢了。',
        ja: '今日の健康状態は全般的に安定した流れです。こんな穏やかな日こそ極端なダイエットや過度の運動より規則的でバランスの取れた生活を実践するのに最も良い日です。今日一日日常の健康ルーティンを忠実に守るだけで体は十分感謝するでしょう。',
        es: 'Tu condición de salud fluye en un patrón generalmente estable hoy. Los días pacíficos como este son en realidad el mejor momento para practicar una vida regular y equilibrada en lugar de dietas extremas o ejercicio excesivo. Simplemente mantener fielmente tu rutina de salud diaria hoy será suficiente para que tu cuerpo lo agradezca.',
      },
      {
        ko: '오늘은 몸에게 필요한 것이 무엇인지 귀를 기울이는 날입니다. 너무 무리해도, 너무 쉬어도 아닌 딱 적당한 균형이 오늘의 건강 열쇠입니다. 몸이 보내는 신호를 존중하면서 활동 수준을 조절하면 내일 더욱 활기차게 시작할 수 있습니다.',
        en: 'Today is a day to listen to what your body needs. The health key today is a balance that is neither too much exertion nor too much rest—exactly the right middle. Respect the signals your body sends and adjust your activity level, and you will be able to start tomorrow more energetically.',
        zh: '今天是倾听身体需要什么的日子。不太过也不太闲——恰到好处的平衡是今天健康的关键。尊重身体发出的信号调整活动水平，明天就能更充满活力地开始。',
        ja: '今日は体が何を必要としているかに耳を傾ける日です。無理しすぎでも休みすぎでもなく、ちょうど適度な均衡が今日の健康の鍵です。体が送るサインを尊重しながら活動レベルを調整すると明日より元気に始めることができます。',
        es: 'Hoy es un día para escuchar lo que tu cuerpo necesita. La clave de salud hoy es un equilibrio que no sea ni demasiado esfuerzo ni demasiado descanso—exactamente el punto medio adecuado. Respeta las señales que envía tu cuerpo y ajusta tu nivel de actividad.',
      },
      {
        ko: '가벼운 산책이나 스트레칭이 오늘 당신의 몸과 마음 모두에 긍정적인 변화를 가져올 것입니다. 거창한 운동 계획이 없어도 괜찮으며, 5분의 스트레칭이나 10분의 산책만으로도 혈액순환이 개선되고 기분이 밝아집니다. 오늘 잠깐이라도 밖으로 나가 신선한 공기를 마셔보세요.',
        en: 'Light walking or stretching today will bring positive changes to both your body and mind. It is perfectly fine without a grand exercise plan—even just 5 minutes of stretching or 10 minutes of walking improves circulation and brightens your mood. Step outside for fresh air even briefly today.',
        zh: '今天轻松的散步或伸展运动将为你的身心都带来积极变化。没有宏大的运动计划也没关系，哪怕只是5分钟伸展或10分钟散步，也能改善血液循环、让心情明朗起来。今天哪怕出去一小会儿呼吸一下新鲜空气吧。',
        ja: '軽い散歩やストレッチが今日あなたの体と心の両方にポジティブな変化をもたらすでしょう。大した運動計画がなくても大丈夫で、5分のストレッチや10分の散歩だけでも血行が改善されて気分が明るくなります。今日少しでも外に出て新鮮な空気を吸ってみてください。',
        es: 'Caminar ligero o estirar hoy traerá cambios positivos tanto a tu cuerpo como a tu mente. Está perfectamente bien sin un plan de ejercicio grandioso—incluso solo 5 minutos de estiramiento o 10 minutos caminando mejora la circulación y aclara tu estado de ánimo. Sal a tomar aire fresco aunque sea brevemente hoy.',
      },
      {
        ko: '오늘 수분을 충분히 섭취하고 영양의 균형을 맞추는 것이 당신의 에너지와 컨디션을 유지하는 데 큰 역할을 합니다. 몸은 당신이 주는 것으로 작동하며, 좋은 연료가 들어가면 좋은 성능이 나옵니다. 오늘 식사 한 끼를 조금 더 신경 써서 준비해보세요—음식이 곧 약입니다.',
        en: 'Drinking sufficient water and balancing your nutrition today plays a major role in maintaining your energy and condition. Your body runs on what you give it, and good fuel produces good performance. Pay a little more attention to preparing one meal today—food is medicine.',
        zh: '今天充足的水分摄入和营养均衡对维持你的能量和状态起着重要作用。身体靠你给予的东西运转，好的燃料产生好的表现。今天对一顿饭稍微用心准备一下吧——食物就是药。',
        ja: '今日十分な水分を摂り栄養のバランスを整えることが、あなたのエネルギーとコンディションを維持するのに大きな役割を果たします。体はあなたが与えるもので動き、良い燃料が入れば良いパフォーマンスが出ます。今日一食を少し気を配って準備してみてください。',
        es: 'Beber suficiente agua y equilibrar tu nutrición hoy juega un papel importante en mantener tu energía y condición. Tu cuerpo funciona con lo que le das, y el buen combustible produce buen rendimiento. Presta un poco más de atención a preparar una comida hoy—la comida es medicina.',
      },
      {
        ko: '오늘 건강 관리에서 가장 중요한 것은 거창한 계획보다 작은 것들을 꾸준히 실천하는 것입니다. 하루에 계단 한 번 더 오르기, 물 한 잔 더 마시기, 잠자리에 10분 더 일찍 들기 같은 작은 선택들이 쌓여 건강을 만듭니다. 완벽하지 않아도 괜찮으니 오늘 딱 한 가지만 실천해보세요.',
        en: 'In health care today, what matters most is practicing small things consistently rather than grand plans. Small choices like climbing one more flight of stairs, drinking one more glass of water, or going to bed 10 minutes earlier accumulate to build health. It does not have to be perfect—try practicing just one thing today.',
        zh: '今天健康管理中最重要的不是宏大的计划，而是持续实践小事。多爬一次楼梯、多喝一杯水、早10分钟上床这样的小选择积累起来就构成了健康。不需要完美，今天只实践一件事就好。',
        ja: '今日の健康管理で最も大切なのは大きな計画より小さなことを着実に実践することです。一日に階段をもう一度登る、水をもう一杯飲む、寝床に10分早く入るような小さな選択が積み重なって健康を作ります。完璧でなくていいので今日ただ一つだけ実践してみてください。',
        es: 'En el cuidado de la salud hoy, lo que más importa es practicar cosas pequeñas consistentemente más que planes grandiosos. Pequeñas elecciones como subir un tramo más de escaleras, beber un vaso más de agua, o acostarse 10 minutos antes se acumulan para construir salud. No tiene que ser perfecto—intenta practicar solo una cosa hoy.',
      },
    ],
    low: [
      {
        ko: '오늘은 피로가 쌓이기 쉬운 날입니다. 이것은 당신이 그동안 너무 열심히 달려왔다는 몸의 솔직한 신호이며, 무시할 경우 나중에 더 큰 대가를 치를 수 있습니다. 오늘은 최선을 다해 쉬는 것이 최선의 선택이며, 진정한 휴식을 통해 내일의 활력을 비축하세요.',
        en: 'Fatigue tends to accumulate easily today. This is your body\'s honest signal that you have been running too hard, and ignoring it may exact a much larger cost later. Today, resting with full intention is the best choice—store up tomorrow\'s vitality through genuine rest.',
        zh: '今天容易积累疲劳。这是身体发出的诚实信号，说明你一直跑得太猛了，如果忽视可能以后要付出更大的代价。今天全力以赴地休息是最好的选择，通过真正的休息为明天储备活力。',
        ja: '今日は疲労がたまりやすい日です。これはあなたがこれまで走りすぎてきたという体の正直なサインで、無視した場合後でより大きな代償を払う可能性があります。今日は全力で休むことが最善の選択で、真の休息を通じて明日の活力を蓄えてください。',
        es: 'La fatiga tiende a acumularse fácilmente hoy. Esta es la señal honesta de tu cuerpo de que has estado corriendo demasiado fuerte, e ignorarla puede exigir un costo mucho mayor después. Hoy, descansar con plena intención es la mejor elección—almacena la vitalidad de mañana a través del descanso genuino.',
      },
      {
        ko: '오늘은 면역력이 다소 저하될 수 있는 날입니다. 특별히 추위나 감염에 노출되지 않도록 주의하고, 충분한 수면과 영양을 통해 몸의 방어막을 지켜주세요. 몸을 소중히 대하는 것이 장기적으로 가장 효율적인 건강 투자임을 기억하세요.',
        en: 'Your immunity may decrease somewhat today. Pay special attention to avoiding exposure to cold or infection, and protect your body\'s defenses through sufficient sleep and nutrition. Remember that treating your body with care is the most efficient long-term health investment.',
        zh: '今天免疫力可能有所下降。特别注意避免受凉或感染，通过充足的睡眠和营养保护身体的防御屏障。记住，善待身体是长期来看最有效的健康投资。',
        ja: '今日は免疫力がやや低下する可能性がある日です。特に寒さや感染に露出されないよう注意し、十分な睡眠と栄養で体の防御幕を守ってください。体を大切にすることが長期的に最も効率的な健康投資であることを覚えておいてください。',
        es: 'Tu inmunidad puede disminuir algo hoy. Presta especial atención a evitar la exposición al frío o la infección, y protege las defensas de tu cuerpo a través de sueño y nutrición suficientes. Recuerda que tratar tu cuerpo con cuidado es la inversión de salud a largo plazo más eficiente.',
      },
      {
        ko: '오늘은 몸이 보내는 스트레스 신호를 무시하지 마세요. 두통, 소화불량, 긴장된 어깨 등 작은 신체 증상들은 마음의 부담이 한계에 가까워지고 있다는 경고입니다. 오늘 하루 조금이라도 마음을 이완시키는 시간을 가져보세요—몸과 마음은 하나로 연결되어 있습니다.',
        en: 'Do not ignore the stress signals your body sends today. Small physical symptoms like headaches, indigestion, or tense shoulders are warnings that the burden on your mind is approaching its limit. Take some time today to relax your mind even a little—body and mind are connected as one.',
        zh: '今天不要忽视身体发出的压力信号。头痛、消化不良、紧绷的肩膀等小小的身体症状是心理负担接近极限的警告。今天花一点时间让心情放松一下——身体和心灵是相连的。',
        ja: '今日体が送るストレスのサインを無視しないでください。頭痛、消化不良、張った肩などの小さな身体症状は心の負担が限界に近づいているという警告です。今日少しでも心をリラックスさせる時間を持ってみてください—体と心は一つにつながっています。',
        es: 'No ignores las señales de estrés que envía tu cuerpo hoy. Síntomas físicos pequeños como dolores de cabeza, indigestión o hombros tensos son advertencias de que la carga en tu mente se acerca a su límite. Tómate algo de tiempo hoy para relajar tu mente aunque sea un poco.',
      },
      {
        ko: '오늘은 식욕이나 음주에 대한 유혹이 강해질 수 있지만, 과도한 섭취는 오히려 몸을 더 무겁게 만듭니다. 먹고 마시는 것으로 스트레스를 해소하려는 충동이 생길 때, 그 에너지를 짧은 산책이나 심호흡으로 전환해보세요. 절제는 억압이 아니라 자신을 사랑하는 방식입니다.',
        en: 'Temptation toward overeating or drinking may strengthen today, but excessive intake will actually make your body feel heavier. When the impulse to relieve stress through eating or drinking arises, try redirecting that energy into a short walk or deep breathing. Moderation is not suppression—it is a way of loving yourself.',
        zh: '今天对饮食或饮酒的诱惑可能会增强，但过度摄入反而会让身体感觉更沉重。当用吃喝来缓解压力的冲动出现时，试着将那份能量转化为短暂散步或深呼吸。节制不是压抑，而是爱自己的方式。',
        ja: '今日は食欲や飲酒への誘惑が強まることがありますが、過度な摂取はむしろ体をより重くします。食べたり飲んだりでストレスを解消しようとする衝動が生じた時、そのエネルギーを短い散歩や深呼吸に転換してみてください。節制は抑圧ではなく自分を愛する方法です。',
        es: 'La tentación hacia comer en exceso o beber puede fortalecerse hoy, pero el consumo excesivo en realidad hará que tu cuerpo se sienta más pesado. Cuando surja el impulso de aliviar el estrés comiendo o bebiendo, intenta redirigir esa energía hacia una caminata corta o respiración profunda. La moderación no es supresión—es una forma de amarte.',
      },
      {
        ko: '몸에서 작은 이상 신호가 느껴진다면 오늘 반드시 주의를 기울여야 합니다. 작은 불편함을 "이 정도는 괜찮겠지"라며 무시하는 습관이 건강을 서서히 무너뜨립니다. 오늘 느끼는 불편함을 기록해두고, 필요하다면 전문가의 조언을 구하는 것을 미루지 마세요—자신을 돌보는 것이 용기입니다.',
        en: 'If you feel any small abnormal signal from your body today, you must pay attention to it. The habit of dismissing small discomforts with "this much is probably fine" gradually erodes your health. Note the discomfort you feel today, and if necessary do not postpone seeking professional advice—caring for yourself is courage.',
        zh: '如果今天身体发出小小的异常信号，一定要引起注意。用"这点小事应该没问题"来忽视小不适的习惯会慢慢侵蚀健康。记录下今天感到的不适，如有必要不要推迟寻求专业建议——照顾自己是一种勇气。',
        ja: '体から小さな異常サインが感じられたら今日必ず注意を払わなければなりません。小さな不調を「これくらいは大丈夫だろう」と無視する習慣が健康を徐々に蝕みます。今日感じる不調を記録し、必要なら専門家の助言を求めることを先延ばしにしないでください。',
        es: 'Si sientes alguna pequeña señal anormal de tu cuerpo hoy, debes prestarle atención. El hábito de desestimar pequeñas molestias con "esto probablemente está bien" erosiona gradualmente tu salud. Anota las molestias que sientes hoy, y si es necesario no pospongas buscar consejo profesional—cuidarse es coraje.',
      },
    ],
  },
  money: {
    high: [
      {
        ko: '오늘은 재물운이 뚜렷하게 상승하는 날입니다. 당신이 그동안 쌓아온 신뢰와 노력이 금전적인 형태로 돌아오기 시작하는 시기이며, 주의 깊게 살피면 좋은 투자나 수익 기회가 눈에 들어올 것입니다. 지나치게 신중하기보다 오늘은 합리적인 판단으로 과감하게 행동해보세요—재물은 용기 있는 자에게 옵니다.',
        en: 'Your financial fortune rises noticeably today. The trust and effort you have been building are beginning to return in monetary form, and if you observe carefully, good investment or income opportunities will come into view. Rather than being overly cautious, act boldly with rational judgment today—wealth comes to the courageous.',
        zh: '今天财运明显上升。你长期积累的信任和努力开始以金钱的形式回报，仔细观察的话，好的投资或收益机会将会映入眼帘。与其过于谨慎，今天用合理的判断果敢行动吧——财富眷顾勇敢的人。',
        ja: '今日は金運が顕著に上昇する日です。これまで積み重ねてきた信頼と努力が金銭的な形で返ってき始める時期で、注意深く見ると良い投資や収益チャンスが目に入ってくるでしょう。過度に慎重すぎるより今日は合理的な判断で大胆に行動してみてください。',
        es: 'Tu fortuna financiera sube notablemente hoy. La confianza y el esfuerzo que has estado construyendo están comenzando a regresar en forma monetaria, y si observas con cuidado, las buenas oportunidades de inversión o ingreso aparecerán. En lugar de ser demasiado cauteloso, actúa audazmente con juicio racional hoy.',
      },
      {
        ko: '오늘은 예상치 못한 방향에서 금전적인 행운이 찾아올 수 있습니다. 평소 관심 없던 분야, 오래된 인연, 혹은 잊고 있던 자산에서 뜻밖의 수입이 발생할 수 있으니 주변을 넓게 살펴보세요. 기회는 항상 준비된 자에게 오며, 오늘 당신은 충분히 준비되어 있습니다.',
        en: 'Unexpected financial luck may arrive today from an unforeseen direction. Unexpected income may arise from a field you have not paid attention to, an old connection, or an asset you had forgotten—so observe your surroundings broadly. Opportunity always comes to the prepared, and today you are sufficiently prepared.',
        zh: '今天可能从意想不到的方向获得金钱上的好运。可能从平时不关注的领域、旧日缘分或遗忘的资产中产生意外收入，所以要广泛观察周围。机会总是给有准备的人，今天你已经准备充分了。',
        ja: '今日は予想外の方向から金銭的な幸運が訪れることがあります。普段関心のなかった分野、古い縁、あるいは忘れていた資産から思いがけない収入が発生する可能性があるので周囲を広く見渡してください。チャンスは常に準備された者に来て、今日あなたは十分に準備されています。',
        es: 'La suerte financiera inesperada puede llegar hoy desde una dirección imprevista. Ingresos inesperados pueden surgir de un campo al que no has prestado atención, una vieja conexión, o un activo que habías olvidado—así que observa tu entorno ampliamente. La oportunidad siempre llega al preparado, y hoy estás suficientemente preparado.',
      },
      {
        ko: '오늘은 금전 관련 협상이나 계약에서 당신에게 유리한 상황이 펼쳐집니다. 평소보다 설득력이 높아져 있고, 상대방도 당신의 제안을 긍정적으로 받아들일 준비가 되어 있습니다. 망설이지 말고 원하는 조건을 분명히 말하세요—오늘은 당신이 원하는 것을 얻을 수 있는 날입니다.',
        en: 'Today a favorable situation unfolds for you in financial negotiations or contracts. Your persuasive power is higher than usual, and the other party is ready to receive your proposal positively. State your desired terms clearly without hesitation—today is a day when you can get what you want.',
        zh: '今天在金钱谈判或合同上对你有利的情况展开。你的说服力比平时更高，对方也准备好积极接受你的提议。不要犹豫，清楚地说出你想要的条件——今天是你能得到想要的东西的日子。',
        ja: '今日は金銭関連の交渉や契約であなたに有利な状況が展開します。普段より説得力が高まっており、相手もあなたの提案を前向きに受け入れる準備ができています。ためらわずに望む条件をはっきり言ってください。',
        es: 'Hoy se despliega una situación favorable para ti en negociaciones o contratos financieros. Tu poder persuasivo es más alto de lo usual, y la otra parte está lista para recibir tu propuesta positivamente. Expresa tus términos deseados claramente sin dudar—hoy es un día en que puedes obtener lo que quieres.',
      },
      {
        ko: '오늘은 평소에 엄두도 못 냈던 큰 지출이나 투자에 대한 여유가 생기는 날입니다. 이 에너지가 무한하지 않으니 현명하게 우선순위를 정하고, 가장 가치 있는 곳에 자원을 집중하세요. 돈은 쓰는 곳에서 가치가 만들어지며, 오늘의 현명한 지출이 미래의 더 큰 자산이 됩니다.',
        en: 'Today brings the financial ease for large expenditures or investments you could not have considered before. Since this energy is not infinite, set priorities wisely and concentrate your resources on the most valuable place. Value is created where money is spent, and today\'s wise expenditure becomes a larger asset in the future.',
        zh: '今天对于平时根本无从考虑的大额支出或投资，你多了一份从容。这种能量不是无限的，所以要明智地确定优先级，将资源集中在最有价值的地方。价值在金钱被使用的地方被创造，今天明智的支出将成为未来更大的资产。',
        ja: '今日は普段は思いもよらなかった大きな支出や投資への余裕が生まれる日です。このエネルギーが無限でないので賢く優先順位を決め、最も価値ある場所にリソースを集中してください。お金は使う場所で価値が生まれ、今日の賢明な支出が未来のより大きな資産になります。',
        es: 'Hoy trae la facilidad financiera para gastos o inversiones grandes que antes no hubieras podido considerar. Como esta energía no es infinita, establece prioridades sabiamente y concentra tus recursos en el lugar más valioso. El valor se crea donde se gasta el dinero, y el gasto sabio de hoy se convierte en un activo mayor en el futuro.',
      },
      {
        ko: '오늘은 재정적인 목표가 손에 닿을 것처럼 가까이 느껴지는 날입니다. 당신이 오랫동안 향해온 방향이 옳았으며, 지금까지의 노력이 헛되지 않았다는 증거가 서서히 나타나고 있습니다. 포기하지 않아서 다행이라는 생각이 들게 될 것입니다—조금만 더 나아가세요.',
        en: 'Today your financial goals feel within reach as though you could touch them. The direction you have been heading for so long was right, and evidence that your efforts have not been in vain is slowly beginning to show. You will find yourself thinking it was a good thing you did not give up—just go a little further.',
        zh: '今天财务目标感觉近在咫尺，仿佛触手可及。你长期前进的方向是正确的，过去努力没有白费的证据正在慢慢显现。你会庆幸自己没有放弃——再向前走一点点。',
        ja: '今日は財政的な目標が手に届くほど近く感じられる日です。あなたがずっと向かってきた方向は正しく、これまでの努力が無駄ではなかったという証拠が少しずつ現れています。諦めなくてよかったと思えるようになるでしょう—もう少し前進してください。',
        es: 'Hoy tus metas financieras se sienten al alcance de la mano como si pudieras tocarlas. La dirección que has estado siguiendo durante tanto tiempo era correcta, y la evidencia de que tus esfuerzos no han sido en vano comienza a mostrarse lentamente. Te encontrarás pensando que fue bueno que no te rindas—solo avanza un poco más.',
      },
    ],
    medium: [
      {
        ko: '오늘 재정 상태는 안정적인 흐름을 유지하고 있습니다. 극적인 변화는 없지만 이 안정이야말로 자산을 천천히 쌓아가기에 가장 좋은 환경입니다. 오늘 계획적으로 한 가지 지출 항목을 줄이거나 작은 저축을 추가해보세요—습관이 자산을 만듭니다.',
        en: 'Your financial condition maintains a stable flow today. There are no dramatic changes, but this stability is the best environment for slowly building assets. Try reducing one spending category or adding a small saving today in a planned way—habits build wealth.',
        zh: '今天财务状况保持稳定的流动。虽然没有戏剧性的变化，但这种稳定正是慢慢积累资产的最好环境。今天有计划地减少一项支出或增加一点储蓄吧——习惯创造财富。',
        ja: '今日の財政状態は安定した流れを維持しています。劇的な変化はありませんが、この安定こそが資産をゆっくり積み上げるのに最も良い環境です。今日計画的に一つの支出項目を減らすか小さな貯蓄を追加してみてください。',
        es: 'Tu condición financiera mantiene un flujo estable hoy. No hay cambios dramáticos, pero esta estabilidad es el mejor entorno para construir activos lentamente. Intenta reducir una categoría de gasto o añadir un pequeño ahorro hoy de manera planificada—los hábitos construyen riqueza.',
      },
      {
        ko: '지금은 저축을 늘리기에 좋은 시기입니다. 큰 금액으로 시작하려는 부담을 내려놓고, 오늘부터 작은 금액이라도 규칙적으로 저축하는 습관을 만들어보세요. 100만 원의 저축보다 매일 저축하는 습관이 훨씬 더 강력한 재정적 기초를 만듭니다.',
        en: 'Now is a good time to increase savings. Let go of the pressure to start with a large amount, and from today build the habit of saving regularly even with a small sum. The habit of saving every day builds a far more powerful financial foundation than a one-time large deposit.',
        zh: '现在是增加储蓄的好时机。放下一开始就要存大额的压力，从今天开始养成定期储蓄哪怕小额的习惯。每天储蓄的习惯比一次性存入大笔钱能建立更强大的财务基础。',
        ja: '今は貯蓄を増やすのに良い時期です。大きな金額から始めなければというプレッシャーを手放して、今日から少額でも定期的に貯蓄する習慣を作ってみてください。百万円の貯蓄より毎日貯蓄する習慣の方がずっと強力な財政的基盤を作ります。',
        es: 'Ahora es un buen momento para aumentar los ahorros. Suelta la presión de empezar con una gran cantidad, y desde hoy construye el hábito de ahorrar regularmente incluso con una suma pequeña. El hábito de ahorrar cada día construye una base financiera mucho más poderosa que un gran depósito único.',
      },
      {
        ko: '오늘은 지출을 줄이는 것이 수입을 늘리는 것과 똑같이 재정에 긍정적인 영향을 준다는 것을 실감하게 될 것입니다. 불필요한 구독 서비스, 충동적으로 사는 습관, 낭비되는 식비 중 한 가지만 줄여도 한 달이면 상당한 금액이 모입니다. 작은 절제가 큰 자유를 만들어줍니다.',
        en: 'Today you will realize that reducing expenses has the same positive impact on your finances as increasing income. Cutting just one of unnecessary subscription services, impulse buying habits, or wasted food expenses will accumulate to a substantial amount in a month. Small moderation creates great freedom.',
        zh: '今天你会真切感受到，减少支出和增加收入对财务的积极影响是一样的。减少一项不必要的订阅服务、冲动购买习惯或浪费的餐饮费，一个月下来就能积累相当可观的金额。小小的节制创造大自由。',
        ja: '今日は支出を減らすことが収入を増やすことと同様に財政にポジティブな影響を与えると実感するでしょう。不必要なサブスクリプションサービス、衝動的に買う習慣、無駄な食費のうち一つだけ減らしても一ヶ月で相当な金額が貯まります。小さな節制が大きな自由を作ります。',
        es: 'Hoy te darás cuenta de que reducir gastos tiene el mismo impacto positivo en tus finanzas que aumentar los ingresos. Cortar solo uno de los servicios de suscripción innecesarios, hábitos de compra impulsiva, o gastos de comida desperdiciados acumulará una cantidad sustancial en un mes. La pequeña moderación crea gran libertad.',
      },
      {
        ko: '오늘은 재정 상태를 냉정하게 점검하고 현실적인 예산을 다시 설정하기에 좋은 날입니다. 막연한 걱정보다 구체적인 숫자를 마주하면 오히려 마음이 가벼워지는 경우가 많습니다. 지금 가진 것의 목록을 만들어보고, 다음 목표를 명확히 정의해보세요—방향이 생기면 불안이 줄어듭니다.',
        en: 'Today is a good day to coldly review your financial condition and reset a realistic budget. Confronting specific numbers rather than vague worry often actually lightens your mind. Make a list of what you currently have, and clearly define your next goal—when direction exists, anxiety decreases.',
        zh: '今天是冷静检查财务状况、重新设定现实预算的好日子。面对具体数字而非模糊的担忧，往往反而让心情变得轻松。列出你现有的资产清单，明确定义下一个目标——有了方向，焦虑就会减少。',
        ja: '今日は財政状態を冷静に点検して現実的な予算を再設定するのに良い日です。漠然とした心配より具体的な数字と向き合うとかえって心が軽くなることが多いです。今持っているもののリストを作って次の目標を明確に定義してみてください。',
        es: 'Hoy es un buen día para revisar fríamente tu condición financiera y restablecer un presupuesto realista. Confrontar números específicos en lugar de preocupaciones vagas a menudo en realidad aligera tu mente. Haz una lista de lo que tienes actualmente, y define claramente tu próxima meta—cuando existe dirección, la ansiedad disminuye.',
      },
      {
        ko: '현재 수입 수준에서 만족을 찾는 것은 체념이 아니라 지혜입니다. 더 많은 것을 바라는 마음과 지금 있는 것에 감사하는 마음의 균형이 재정적 행복의 핵심입니다. 오늘은 가진 것들의 가치를 다시 한번 돌아보세요—충분함을 느끼는 사람이 가장 부유한 사람입니다.',
        en: 'Finding satisfaction at your current income level is wisdom, not resignation. The balance between desiring more and being grateful for what exists now is the core of financial happiness. Review the value of what you have today—the person who feels sufficiency is the wealthiest person.',
        zh: '在当前收入水平上找到满足是智慧，而非妥协。渴望更多与感恩现有之间的平衡是财务幸福的核心。今天再次审视你所拥有之物的价值——感受到充足的人是最富有的人。',
        ja: '現在の収入水準で満足を見つけることは諦めではなく知恵です。もっと望む気持ちと今あるものへの感謝の気持ちのバランスが財政的幸福の核心です。今日は持っているものの価値をもう一度振り返ってみてください—十分さを感じる人が最も豊かな人です。',
        es: 'Encontrar satisfacción en tu nivel de ingresos actual es sabiduría, no resignación. El equilibrio entre desear más y ser agradecido por lo que existe ahora es el núcleo de la felicidad financiera. Revisa el valor de lo que tienes hoy—la persona que siente suficiencia es la más rica.',
      },
    ],
    low: [
      {
        ko: '예상치 못한 지출이 발생할 수 있는 날입니다. 이런 날을 대비해 비상금을 미리 준비해두는 것이 얼마나 중요한지 새삼 느끼게 됩니다. 지금 당장 비상금이 충분하지 않다면, 오늘을 계기로 비상금 마련 계획을 세워보세요—미래의 당신이 오늘의 선택에 감사할 것입니다.',
        en: 'Unexpected expenses may arise today. A day like this freshly highlights how important it is to prepare emergency funds in advance. If your emergency fund is not currently sufficient, use today as the occasion to create a plan for building one—your future self will be grateful for today\'s choice.',
        zh: '今天可能会产生意外支出。这样的日子让你重新深刻感受到提前准备应急资金有多么重要。如果现在应急资金还不够充足，就以今天为契机制定储备应急资金的计划吧——未来的你会感谢今天的选择。',
        ja: '予想外の支出が発生する可能性がある日です。このような日を備えて非常金をあらかじめ準備しておくことがいかに大切かを改めて感じます。今すぐ非常金が十分でないなら今日を機に非常金確保計画を立ててみてください。',
        es: 'Pueden surgir gastos inesperados hoy. Un día así destaca de nuevo cuán importante es preparar fondos de emergencia con anticipación. Si tu fondo de emergencia no es actualmente suficiente, usa hoy como ocasión para crear un plan para construir uno—tu yo futuro estará agradecido por la elección de hoy.',
      },
      {
        ko: '오늘은 투자나 큰 금전 결정을 서두르지 않는 것이 현명합니다. 지금의 상황에서 내리는 결정은 나중에 후회를 남길 수 있으며, 조금 더 기다리고 더 많은 정보를 확보한 뒤에 행동하는 것이 더 나은 결과를 가져옵니다. 기다림도 하나의 투자 전략임을 기억하세요.',
        en: 'It is wise not to rush investments or major financial decisions today. Decisions made in the current situation may leave regret later, and acting after waiting a little longer and securing more information will bring better results. Remember that waiting is also one investment strategy.',
        zh: '今天不急于投资或做出重大金融决定是明智的。在当前情况下做出的决定可能以后会留下遗憾，再等一等、获取更多信息后行动会带来更好的结果。记住，等待也是一种投资策略。',
        ja: '今日は投資や大きな金銭決断を急がないことが賢明です。今の状況で下す決定は後で後悔を残すことがあり、もう少し待ってより多くの情報を確保した後で行動する方がより良い結果をもたらします。待つことも一つの投資戦略であることを覚えておいてください。',
        es: 'Es sabio no apresurar inversiones o decisiones financieras importantes hoy. Las decisiones tomadas en la situación actual pueden dejar arrepentimiento después, y actuar después de esperar un poco más y asegurar más información traerá mejores resultados. Recuerda que esperar también es una estrategia de inversión.',
      },
      {
        ko: '오늘은 금전 관련 계약이나 서류에 특히 신중해야 합니다. 서두르거나 상대의 압박에 흔들려 사인하는 순간, 나중에 돌이키기 어려운 상황이 올 수 있습니다. 아무리 좋은 조건처럼 보여도 충분히 검토하고, 필요하다면 전문가의 조언을 구한 뒤에 결정하세요.',
        en: 'Particular caution is needed today with money-related contracts or documents. The moment you sign while rushing or swayed by the other party\'s pressure, a situation that is difficult to reverse later may come. No matter how favorable the conditions appear, review them sufficiently and if necessary seek professional advice before deciding.',
        zh: '今天对与金钱相关的合同或文件需要特别谨慎。匆忙行事或被对方施压而签字的那一刻，可能会出现以后难以挽回的情况。不管条件看起来多好，都要充分审查，必要时寻求专业建议后再决定。',
        ja: '今日は金銭関連の契約や書類に特に慎重になる必要があります。急いだり相手の圧力に揺れてサインした瞬間、後で取り返しのつかない状況が来る可能性があります。どんなに良い条件に見えても十分に検討し、必要なら専門家の助言を求めた後で決断してください。',
        es: 'Se necesita particular cautela hoy con contratos o documentos relacionados con dinero. En el momento en que firmes apresuradamente o influenciado por la presión de la otra parte, puede llegar una situación difícil de revertir después. Por favorables que parezcan las condiciones, revísalas suficientemente y si es necesario busca consejo profesional antes de decidir.',
      },
      {
        ko: '충동적인 구매 욕구가 강해지기 쉬운 날입니다. 뇌는 스트레스를 받으면 즉각적인 보상을 원하기 때문에 쇼핑이 유혹적으로 느껴지지만, 그 물건이 진짜 필요한지 24시간 후에 다시 생각해보는 습관이 재정 건강을 지킵니다. 오늘 하루 구매 전에 "1일 대기" 규칙을 적용해보세요.',
        en: 'The impulse to make purchases tends to strengthen today. The brain craves immediate reward under stress, making shopping feel tempting, but the habit of reconsidering whether you truly need an item 24 hours later protects your financial health. Apply the "wait 1 day" rule before making any purchase today.',
        zh: '今天冲动购买的欲望容易增强。大脑在压力下渴望即时奖励，使购物感觉诱人，但养成24小时后再思考是否真的需要那件东西的习惯，能守护财务健康。今天购买前试用"等待1天"规则吧。',
        ja: '衝動的な購買欲求が強まりやすい日です。脳はストレスを受けると即座の報酬を求めるためショッピングが誘惑的に感じられますが、その物が本当に必要か24時間後に再び考える習慣が財政の健康を守ります。今日一日購買前に「1日待ち」ルールを適用してみてください。',
        es: 'El impulso de hacer compras tiende a fortalecerse hoy. El cerebro ansía recompensa inmediata bajo estrés, haciendo que ir de compras se sienta tentador, pero el hábito de reconsiderar si realmente necesitas un artículo 24 horas después protege tu salud financiera. Aplica la regla de "esperar 1 día" antes de cualquier compra hoy.',
      },
      {
        ko: '오늘은 금전 분실이나 사기, 예상 밖의 청구에 주의가 필요한 날입니다. 지갑이나 카드를 평소보다 더 주의 깊게 관리하고, 금전 거래는 신뢰할 수 있는 채널을 통해서만 진행하세요. 작은 부주의가 큰 손실로 이어질 수 있으니, 오늘만큼은 조금 더 꼼꼼하게 챙기는 것이 좋습니다.',
        en: 'Today requires caution for financial loss, fraud, or unexpected charges. Manage your wallet or cards more carefully than usual, and conduct financial transactions only through trustworthy channels. Small carelessness can lead to large losses, so it is better to be a little more thorough today.',
        zh: '今天需要注意财物丢失、诈骗或意外账单。比平时更仔细地管理钱包和卡片，只通过可信渠道进行金融交易。小小的疏忽可能导致重大损失，所以今天最好更加细心。',
        ja: '今日は金銭の紛失や詐欺、予想外の請求に注意が必要な日です。財布やカードを普段より注意深く管理し、金銭取引は信頼できるチャンネルを通じてのみ行ってください。小さな不注意が大きな損失につながる可能性があるので、今日だけはもう少し念入りに気をつけることがよいです。',
        es: 'Hoy se requiere precaución por pérdida financiera, fraude, o cargos inesperados. Maneja tu cartera o tarjetas con más cuidado de lo usual, y realiza transacciones financieras solo a través de canales confiables. La pequeña descuido puede llevar a grandes pérdidas, así que es mejor ser un poco más minucioso hoy.',
      },
    ],
  },
};

// 원소별 행운의 색상 (Element-based lucky colors)
export type Element = 'fire' | 'earth' | 'air' | 'water';

export const elementLuckyColors: Record<Element, LocalizedText[]> = {
  fire: [
    { ko: '빨강', en: 'Red', zh: '红色', ja: '赤', es: 'Rojo' },
    { ko: '주황', en: 'Orange', zh: '橙色', ja: 'オレンジ', es: 'Naranja' },
    { ko: '금색', en: 'Gold', zh: '金色', ja: 'ゴールド', es: 'Dorado' },
    { ko: '코랄', en: 'Coral', zh: '珊瑚色', ja: 'コーラル', es: 'Coral' },
  ],
  earth: [
    { ko: '초록', en: 'Green', zh: '绿色', ja: '緑', es: 'Verde' },
    { ko: '갈색', en: 'Brown', zh: '棕色', ja: '茶色', es: 'Marrón' },
    { ko: '베이지', en: 'Beige', zh: '米色', ja: 'ベージュ', es: 'Beige' },
    { ko: '카키', en: 'Khaki', zh: '卡其色', ja: 'カーキ', es: 'Caqui' },
  ],
  air: [
    { ko: '노랑', en: 'Yellow', zh: '黄色', ja: '黄色', es: 'Amarillo' },
    { ko: '하늘색', en: 'Sky Blue', zh: '天蓝色', ja: '空色', es: 'Celeste' },
    { ko: '라벤더', en: 'Lavender', zh: '薰衣草色', ja: 'ラベンダー', es: 'Lavanda' },
    { ko: '민트', en: 'Mint', zh: '薄荷色', ja: 'ミント', es: 'Menta' },
  ],
  water: [
    { ko: '파랑', en: 'Blue', zh: '蓝色', ja: '青', es: 'Azul' },
    { ko: '남색', en: 'Indigo', zh: '靛蓝色', ja: '藍色', es: 'Indigo' },
    { ko: '은색', en: 'Silver', zh: '银色', ja: 'シルバー', es: 'Plateado' },
    { ko: '보라', en: 'Purple', zh: '紫色', ja: '紫', es: 'Morado' },
  ],
};

// 행운의 색상 (다국어) - 기본 전체 색상
export const luckyColors: LocalizedText[] = [
  { ko: '빨강', en: 'Red', zh: '红色', ja: '赤', es: 'Rojo' },
  { ko: '주황', en: 'Orange', zh: '橙色', ja: 'オレンジ', es: 'Naranja' },
  { ko: '노랑', en: 'Yellow', zh: '黄色', ja: '黄色', es: 'Amarillo' },
  { ko: '초록', en: 'Green', zh: '绿色', ja: '緑', es: 'Verde' },
  { ko: '파랑', en: 'Blue', zh: '蓝色', ja: '青', es: 'Azul' },
  { ko: '남색', en: 'Indigo', zh: '靛蓝色', ja: '藍色', es: 'Indigo' },
  { ko: '보라', en: 'Purple', zh: '紫色', ja: '紫', es: 'Morado' },
  { ko: '분홍', en: 'Pink', zh: '粉红色', ja: 'ピンク', es: 'Rosa' },
  { ko: '하늘색', en: 'Sky Blue', zh: '天蓝色', ja: '空色', es: 'Celeste' },
  { ko: '갈색', en: 'Brown', zh: '棕色', ja: '茶色', es: 'Marrón' },
  { ko: '검정', en: 'Black', zh: '黑色', ja: '黒', es: 'Negro' },
  { ko: '흰색', en: 'White', zh: '白色', ja: '白', es: 'Blanco' },
  { ko: '금색', en: 'Gold', zh: '金色', ja: 'ゴールド', es: 'Dorado' },
  { ko: '은색', en: 'Silver', zh: '银色', ja: 'シルバー', es: 'Plateado' },
  { ko: '베이지', en: 'Beige', zh: '米色', ja: 'ベージュ', es: 'Beige' },
  { ko: '민트', en: 'Mint', zh: '薄荷色', ja: 'ミント', es: 'Menta' },
  { ko: '코랄', en: 'Coral', zh: '珊瑚色', ja: 'コーラル', es: 'Coral' },
  { ko: '라벤더', en: 'Lavender', zh: '薰衣草色', ja: 'ラベンダー', es: 'Lavanda' },
];

// 행운의 숫자 (1-99)
export const luckyNumbers: number[] = Array.from({ length: 99 }, (_, i) => i + 1);

// 행운의 시간대 (다국어)
export const luckyTimes: LocalizedText[] = [
  { ko: '새벽 (00:00-06:00)', en: 'Dawn (00:00-06:00)', zh: '凌晨 (00:00-06:00)', ja: '夜明け (00:00-06:00)', es: 'Madrugada (00:00-06:00)' },
  { ko: '아침 (06:00-09:00)', en: 'Morning (06:00-09:00)', zh: '早晨 (06:00-09:00)', ja: '朝 (06:00-09:00)', es: 'Mañana (06:00-09:00)' },
  { ko: '오전 (09:00-12:00)', en: 'Late Morning (09:00-12:00)', zh: '上午 (09:00-12:00)', ja: '午前 (09:00-12:00)', es: 'Media mañana (09:00-12:00)' },
  { ko: '점심 (12:00-14:00)', en: 'Noon (12:00-14:00)', zh: '中午 (12:00-14:00)', ja: '昼 (12:00-14:00)', es: 'Mediodía (12:00-14:00)' },
  { ko: '오후 (14:00-18:00)', en: 'Afternoon (14:00-18:00)', zh: '下午 (14:00-18:00)', ja: '午後 (14:00-18:00)', es: 'Tarde (14:00-18:00)' },
  { ko: '저녁 (18:00-21:00)', en: 'Evening (18:00-21:00)', zh: '傍晚 (18:00-21:00)', ja: '夕方 (18:00-21:00)', es: 'Noche temprana (18:00-21:00)' },
  { ko: '밤 (21:00-24:00)', en: 'Night (21:00-24:00)', zh: '夜晚 (21:00-24:00)', ja: '夜 (21:00-24:00)', es: 'Noche (21:00-24:00)' },
];

// 조언 템플릿 (다국어)
export const adviceTemplates: LocalizedText[] = [
  {
    ko: '오늘 하루도 최선을 다하세요. 좋은 일이 기다리고 있습니다.',
    en: 'Do your best today. Good things are waiting for you.',
    zh: '今天也要尽最大努力。好事正在等着你。',
    ja: '今日も最善を尽くしてください。良いことが待っています。',
    es: 'Haz tu mejor esfuerzo hoy. Cosas buenas te esperan.',
  },
  {
    ko: '긍정적인 마음가짐이 행운을 부릅니다. 미소를 잃지 마세요.',
    en: 'A positive mindset attracts luck. Do not lose your smile.',
    zh: '积极的心态会带来好运。不要失去微笑。',
    ja: 'ポジティブな心構えが幸運を呼びます。笑顔を忘れないでください。',
    es: 'Una mentalidad positiva atrae la suerte. No pierdas tu sonrisa.',
  },
  {
    ko: '작은 것에도 감사하는 마음을 가지면 더 큰 행복이 찾아옵니다.',
    en: 'If you are grateful for small things, greater happiness will come.',
    zh: '对小事心怀感恩，更大的幸福就会到来。',
    ja: '小さなことにも感謝の気持ちを持てば、より大きな幸せが訪れます。',
    es: 'Si agradeces las pequeñas cosas, llegará una mayor felicidad.',
  },
  {
    ko: '오늘의 노력이 내일의 성과로 이어집니다. 포기하지 마세요.',
    en: "Today's effort leads to tomorrow's success. Do not give up.",
    zh: '今天的努力会成为明天的成果。不要放弃。',
    ja: '今日の努力が明日の成果につながります。諦めないでください。',
    es: 'El esfuerzo de hoy conduce al éxito de mañana. No te rindas.',
  },
  {
    ko: '주변 사람들에게 친절하세요. 그 친절이 당신에게 돌아올 것입니다.',
    en: 'Be kind to those around you. That kindness will come back to you.',
    zh: '对周围的人友善。那份善意会回到你身边。',
    ja: '周りの人に親切にしてください。その親切があなたに返ってきます。',
    es: 'Sé amable con quienes te rodean. Esa amabilidad volverá a ti.',
  },
  {
    ko: '변화를 두려워하지 마세요. 새로운 시작은 새로운 기회입니다.',
    en: 'Do not fear change. A new beginning is a new opportunity.',
    zh: '不要害怕改变。新的开始就是新的机会。',
    ja: '変化を恐れないでください。新しい始まりは新しいチャンスです。',
    es: 'No temas al cambio. Un nuevo comienzo es una nueva oportunidad.',
  },
  {
    ko: '자신을 믿으세요. 당신에게는 무한한 가능성이 있습니다.',
    en: 'Believe in yourself. You have infinite possibilities.',
    zh: '相信自己。你有无限的可能性。',
    ja: '自分を信じてください。あなたには無限の可能性があります。',
    es: 'Cree en ti mismo. Tienes posibilidades infinitas.',
  },
  {
    ko: '지금 이 순간에 집중하세요. 현재가 가장 중요합니다.',
    en: 'Focus on this moment. The present is most important.',
    zh: '专注于此刻。现在是最重要的。',
    ja: '今この瞬間に集中してください。現在が最も重要です。',
    es: 'Concéntrate en este momento. El presente es lo más importante.',
  },
  {
    ko: '어려움 속에서도 희망을 잃지 마세요. 모든 일에는 끝이 있습니다.',
    en: 'Do not lose hope even in difficulties. Everything has an end.',
    zh: '即使在困难中也不要失去希望。一切都会过去的。',
    ja: '困難の中でも希望を失わないでください。すべてのことには終わりがあります。',
    es: 'No pierdas la esperanza incluso en dificultades. Todo tiene un fin.',
  },
  {
    ko: '건강을 최우선으로 생각하세요. 건강이 모든 것의 기반입니다.',
    en: 'Put health first. Health is the foundation of everything.',
    zh: '把健康放在首位。健康是一切的基础。',
    ja: '健康を最優先に考えてください。健康はすべての基盤です。',
    es: 'Pon la salud en primer lugar. La salud es la base de todo.',
  },
  {
    ko: '완벽을 추구하기보다 진전을 즐기세요. 한 걸음씩 나아가면 됩니다.',
    en: 'Enjoy progress rather than perfection. One step at a time is enough.',
    zh: '享受进步而非追求完美。一步一步来就好。',
    ja: '完璧を追求するより進歩を楽しんでください。一歩ずつ進めば大丈夫です。',
    es: 'Disfruta del progreso más que de la perfección. Un paso a la vez es suficiente.',
  },
  {
    ko: '오늘 만나는 사람 중 누군가가 중요한 인연이 될 수 있습니다. 열린 마음을 가지세요.',
    en: 'Someone you meet today could become an important connection. Keep an open mind.',
    zh: '今天遇到的某个人可能成为重要的缘分。保持开放的心态。',
    ja: '今日出会う人の中に大切な縁になる人がいるかもしれません。オープンな心を持ちましょう。',
    es: 'Alguien que conozcas hoy podría ser una conexión importante. Mantén la mente abierta.',
  },
  {
    ko: '잠시 멈추고 깊게 호흡하세요. 여유가 최선의 판단을 만듭니다.',
    en: 'Pause and breathe deeply. Composure creates the best decisions.',
    zh: '暂停一下，深呼吸。从容才能做出最好的判断。',
    ja: '少し立ち止まって深く呼吸してください。余裕が最善の判断を生みます。',
    es: 'Detente y respira profundo. La calma crea las mejores decisiones.',
  },
  {
    ko: '실패를 두려워하지 마세요. 실패는 성공의 스승입니다.',
    en: 'Do not fear failure. Failure is the teacher of success.',
    zh: '不要害怕失败。失败是成功之母。',
    ja: '失敗を恐れないでください。失敗は成功の師です。',
    es: 'No temas al fracaso. El fracaso es el maestro del éxito.',
  },
  {
    ko: '오늘의 작은 행동이 미래의 큰 변화를 만듭니다. 지금 시작하세요.',
    en: "Today's small actions create big changes in the future. Start now.",
    zh: '今天的小行动创造未来的大变化。现在就开始。',
    ja: '今日の小さな行動が未来の大きな変化を作ります。今始めてください。',
    es: 'Las pequeñas acciones de hoy crean grandes cambios en el futuro. Empieza ahora.',
  },
  {
    ko: '나 자신에게 너무 엄격하지 마세요. 때로는 쉬어가도 괜찮습니다.',
    en: 'Do not be too hard on yourself. It is okay to rest sometimes.',
    zh: '不要对自己太苛刻。有时候休息一下也没关系。',
    ja: '自分に厳しくなりすぎないでください。時には休んでも大丈夫です。',
    es: 'No seas demasiado duro contigo mismo. Está bien descansar a veces.',
  },
  {
    ko: '비교는 행복의 도둑입니다. 나만의 속도로 나아가세요.',
    en: 'Comparison is the thief of joy. Move forward at your own pace.',
    zh: '比较是幸福的小偷。按自己的速度前进。',
    ja: '比較は幸せの泥棒です。自分のペースで進んでください。',
    es: 'La comparación es el ladrón de la alegría. Avanza a tu propio ritmo.',
  },
  {
    ko: '어제의 나보다 오늘의 내가 더 나으면 충분합니다.',
    en: 'Being better today than yesterday is enough.',
    zh: '只要今天的自己比昨天更好就够了。',
    ja: '昨日の自分より今日の自分が少しでも良ければ十分です。',
    es: 'Ser mejor hoy que ayer es suficiente.',
  },
  {
    ko: '당신의 직감을 믿으세요. 내면의 목소리가 올바른 방향을 알려줄 것입니다.',
    en: 'Trust your intuition. Your inner voice will guide you in the right direction.',
    zh: '相信你的直觉。内心的声音会指引正确的方向。',
    ja: '自分の直感を信じてください。内なる声が正しい方向を教えてくれるでしょう。',
    es: 'Confía en tu intuición. Tu voz interior te guiará en la dirección correcta.',
  },
  {
    ko: '마음이 복잡할 때는 자연과 함께하세요. 산책 한 번이 많은 것을 해결해줍니다.',
    en: 'When your mind is complicated, spend time in nature. A walk can solve many things.',
    zh: '心情复杂时去亲近大自然。一次散步能解决很多问题。',
    ja: '心が複雑な時は自然と一緒に過ごしてください。散歩一つで多くのことが解決します。',
    es: 'Cuando tu mente esté complicada, pasa tiempo en la naturaleza. Un paseo resuelve mucho.',
  },
  {
    ko: '감사 일기를 써보세요. 작은 것부터 감사하면 행복이 커집니다.',
    en: 'Try writing a gratitude journal. Starting with small things makes happiness grow.',
    zh: '试着写感恩日记。从小事开始感恩，幸福就会变大。',
    ja: '感謝日記を書いてみてください。小さなことから感謝すれば幸せが大きくなります。',
    es: 'Intenta escribir un diario de gratitud. Agradecer lo pequeño hace crecer la felicidad.',
  },
  {
    ko: '도움을 요청하는 것은 약함이 아닙니다. 함께할 때 더 강해집니다.',
    en: 'Asking for help is not weakness. You become stronger together.',
    zh: '请求帮助不是软弱。在一起时会更强大。',
    ja: '助けを求めることは弱さではありません。一緒にいるとより強くなれます。',
    es: 'Pedir ayuda no es debilidad. Juntos somos más fuertes.',
  },
  {
    ko: '새로운 취미나 관심사를 탐색해보세요. 예상치 못한 재능을 발견할 수 있습니다.',
    en: 'Explore new hobbies or interests. You may discover unexpected talents.',
    zh: '探索新的爱好或兴趣。可能会发现意想不到的才能。',
    ja: '新しい趣味や関心事を探ってみてください。予想外の才能を発見できるかもしれません。',
    es: 'Explora nuevos pasatiempos o intereses. Podrías descubrir talentos inesperados.',
  },
  {
    ko: '오래 연락 못 한 사람에게 안부를 전해보세요. 따뜻한 관계가 회복됩니다.',
    en: 'Reach out to someone you have not contacted in a while. Warm relationships will be restored.',
    zh: '给很久没联系的人问声好吧。温暖的关系会恢复。',
    ja: '久しぶりの人に安否を伝えてみてください。温かい関係が回復します。',
    es: 'Contacta a alguien con quien no hayas hablado en un tiempo. Las relaciones cálidas se restaurarán.',
  },
  {
    ko: '물을 충분히 마시고 규칙적으로 움직이세요. 몸이 가벼워지면 마음도 가벼워집니다.',
    en: 'Drink enough water and move regularly. When your body feels light, your mind follows.',
    zh: '多喝水，规律运动。身体轻松了心情也会轻松。',
    ja: '水を十分に飲んで規則的に動いてください。体が軽くなれば心も軽くなります。',
    es: 'Bebe suficiente agua y muévete regularmente. Cuando tu cuerpo se siente ligero, tu mente también.',
  },
  {
    ko: '목표를 종이에 적어보세요. 글로 적으면 실현 확률이 높아집니다.',
    en: 'Write your goals on paper. Writing them down increases the chance of achieving them.',
    zh: '把目标写在纸上。写下来实现的概率会更高。',
    ja: '目標を紙に書いてみてください。文字にすると実現確率が高まります。',
    es: 'Escribe tus metas en papel. Escribirlas aumenta la probabilidad de lograrlas.',
  },
  {
    ko: '남과 비교하는 시간에 자신을 가꾸세요. 진정한 경쟁자는 어제의 나입니다.',
    en: 'Instead of comparing with others, invest in yourself. Your true competitor is yesterday you.',
    zh: '与其和别人比较，不如提升自己。真正的竞争者是昨天的自己。',
    ja: '他人と比べる時間で自分を磨いてください。本当の競争相手は昨日の自分です。',
    es: 'En vez de compararte, invierte en ti. Tu verdadero competidor eres tú de ayer.',
  },
  {
    ko: '때로는 아무것도 하지 않는 것이 최선의 선택일 수 있습니다. 기다림의 지혜를 배우세요.',
    en: 'Sometimes doing nothing is the best choice. Learn the wisdom of waiting.',
    zh: '有时什么都不做是最好的选择。学习等待的智慧。',
    ja: '時には何もしないことが最善の選択かもしれません。待つことの知恵を学びましょう。',
    es: 'A veces no hacer nada es la mejor opción. Aprende la sabiduría de esperar.',
  },
  {
    ko: '웃음은 최고의 명약입니다. 오늘 하루 한 번은 크게 웃어보세요.',
    en: 'Laughter is the best medicine. Try to laugh heartily at least once today.',
    zh: '笑是最好的良药。今天至少大笑一次吧。',
    ja: '笑いは最高の良薬です。今日一日に一度は大きく笑ってみてください。',
    es: 'La risa es la mejor medicina. Intenta reír con ganas al menos una vez hoy.',
  },
];

// 주간/월간 하이라이트 템플릿
export const weeklyHighlightTemplates: LocalizedText[] = [
  {
    ko: '이번 주는 새로운 도전을 시작하기 좋은 시기입니다. 용기를 내세요.',
    en: 'This week is a good time to start new challenges. Be brave.',
    zh: '这周是开始新挑战的好时机。勇敢一点。',
    ja: '今週は新しい挑戦を始めるのに良い時期です。勇気を出してください。',
    es: 'Esta semana es un buen momento para comenzar nuevos desafíos. Sé valiente.',
  },
  {
    ko: '이번 주는 관계 개선에 집중하면 좋은 결과가 있을 것입니다.',
    en: 'Focusing on improving relationships this week will bring good results.',
    zh: '这周专注于改善关系会有好结果。',
    ja: '今週は関係改善に集中すれば良い結果が得られるでしょう。',
    es: 'Enfocarte en mejorar las relaciones esta semana traerá buenos resultados.',
  },
  {
    ko: '이번 주는 자기 성찰의 시간을 가지면 많은 깨달음을 얻을 수 있습니다.',
    en: 'Taking time for self-reflection this week can bring many insights.',
    zh: '这周花时间自我反省会获得很多领悟。',
    ja: '今週は自己省察の時間を持てば多くの気づきを得られます。',
    es: 'Tomarte tiempo para la autorreflexión esta semana puede traer muchas perspectivas.',
  },
  {
    ko: '이번 주는 재정 관리에 신경 쓰면 안정을 찾을 수 있습니다.',
    en: 'Paying attention to financial management this week can bring stability.',
    zh: '这周注意财务管理可以找到稳定。',
    ja: '今週は財務管理に気を配れば安定を見つけられます。',
    es: 'Prestar atención a la gestión financiera esta semana puede traer estabilidad.',
  },
  {
    ko: '이번 주는 건강에 특히 주의를 기울이세요. 휴식이 필요합니다.',
    en: 'Pay special attention to health this week. Rest is needed.',
    zh: '这周特别注意健康。需要休息。',
    ja: '今週は健康に特に注意を払ってください。休息が必要です。',
    es: 'Presta especial atención a la salud esta semana. Se necesita descanso.',
  },
  {
    ko: '이번 주는 직감이 예리해지는 시기입니다. 내면의 목소리에 귀 기울이세요.',
    en: 'Your intuition sharpens this week. Listen to your inner voice.',
    zh: '这周直觉变得敏锐。倾听内心的声音。',
    ja: '今週は直感が鋭くなる時期です。内なる声に耳を傾けてください。',
    es: 'Tu intuición se agudiza esta semana. Escucha tu voz interior.',
  },
  {
    ko: '이번 주는 오래 미뤄둔 일을 마무리하기에 적합합니다. 정리의 에너지가 함께합니다.',
    en: 'This week is great for completing postponed tasks. Organizing energy is with you.',
    zh: '这周适合完成拖延已久的事情。整理的能量与你同在。',
    ja: '今週は長く先延ばしにしていたことを仕上げるのに適しています。整理のエネルギーが一緒です。',
    es: 'Esta semana es ideal para completar tareas pospuestas. La energía organizadora te acompaña.',
  },
  {
    ko: '이번 주는 커뮤니케이션이 핵심입니다. 진솔한 대화가 문제를 해결합니다.',
    en: 'Communication is key this week. Honest conversations solve problems.',
    zh: '这周沟通是关键。真诚的对话能解决问题。',
    ja: '今週はコミュニケーションが鍵です。率直な対話が問題を解決します。',
    es: 'La comunicación es clave esta semana. Las conversaciones honestas resuelven problemas.',
  },
  {
    ko: '이번 주 후반에 좋은 소식이 기다리고 있습니다. 기대를 가져도 좋습니다.',
    en: 'Good news awaits later this week. You can look forward to it.',
    zh: '这周后半段有好消息等着你。可以期待一下。',
    ja: '今週後半に良い知らせが待っています。期待しても大丈夫です。',
    es: 'Buenas noticias esperan a finales de esta semana. Puedes anticiparlas.',
  },
  {
    ko: '이번 주는 배움의 운이 강합니다. 새로운 기술이나 지식을 익히면 큰 도움이 됩니다.',
    en: 'Learning luck is strong this week. Acquiring new skills or knowledge will be very helpful.',
    zh: '这周学习运很强。学习新技能或知识会有很大帮助。',
    ja: '今週は学びの運が強いです。新しいスキルや知識を身につけると大きな助けになります。',
    es: 'La suerte en el aprendizaje es fuerte esta semana. Adquirir nuevas habilidades será muy útil.',
  },
  {
    ko: '이번 주는 주변 사람들에게 감사를 표현하면 뜻밖의 행운이 찾아옵니다.',
    en: 'Expressing gratitude to those around you this week brings unexpected luck.',
    zh: '这周向周围的人表达感谢会带来意想不到的好运。',
    ja: '今週周りの人に感謝を表現すると思いがけない幸運が訪れます。',
    es: 'Expresar gratitud a quienes te rodean esta semana trae suerte inesperada.',
  },
  {
    ko: '이번 주는 변화의 바람이 불어옵니다. 유연하게 대처하면 좋은 결과를 얻습니다.',
    en: 'Winds of change blow this week. Flexibility brings good results.',
    zh: '这周吹来变化之风。灵活应对会得到好结果。',
    ja: '今週は変化の風が吹いてきます。柔軟に対処すれば良い結果を得られます。',
    es: 'Vientos de cambio soplan esta semana. La flexibilidad trae buenos resultados.',
  },
  {
    ko: '이번 주 중반에 결정적인 만남이나 기회가 있을 수 있습니다. 준비하세요.',
    en: 'A decisive encounter or opportunity may arise mid-week. Be prepared.',
    zh: '这周中可能有决定性的邂逅或机会。做好准备。',
    ja: '今週半ばに決定的な出会いやチャンスがあるかもしれません。準備してください。',
    es: 'Un encuentro o oportunidad decisiva puede surgir a mitad de semana. Prepárate.',
  },
  {
    ko: '이번 주는 에너지 관리가 중요합니다. 과도한 스케줄을 피하고 여유를 가지세요.',
    en: 'Energy management is important this week. Avoid overloading your schedule and take it easy.',
    zh: '这周能量管理很重要。避免过度安排，保持余裕。',
    ja: '今週はエネルギー管理が重要です。過密なスケジュールを避けてゆとりを持ちましょう。',
    es: 'La gestión de energía es importante esta semana. Evita sobrecargar tu agenda y tómatelo con calma.',
  },
];

export const monthlyHighlightTemplates: LocalizedText[] = [
  {
    ko: '이번 달은 성장과 발전의 시기입니다. 새로운 것을 배우기 좋습니다.',
    en: 'This month is a time of growth and development. Good for learning new things.',
    zh: '这个月是成长和发展的时期。适合学习新事物。',
    ja: '今月は成長と発展の時期です。新しいことを学ぶのに良いです。',
    es: 'Este mes es un tiempo de crecimiento y desarrollo. Bueno para aprender cosas nuevas.',
  },
  {
    ko: '이번 달은 인간관계가 풍요로워지는 시기입니다. 소중한 사람들과 시간을 보내세요.',
    en: 'This month relationships become enriched. Spend time with precious people.',
    zh: '这个月人际关系会更加丰富。与珍贵的人共度时光。',
    ja: '今月は人間関係が豊かになる時期です。大切な人と時間を過ごしてください。',
    es: 'Este mes las relaciones se enriquecen. Pasa tiempo con personas preciadas.',
  },
  {
    ko: '이번 달은 재물운이 상승하는 시기입니다. 투자 기회를 살펴보세요.',
    en: 'This month financial fortune rises. Look for investment opportunities.',
    zh: '这个月财运上升。寻找投资机会。',
    ja: '今月は金運が上昇する時期です。投資機会を探してみてください。',
    es: 'Este mes la fortuna financiera sube. Busca oportunidades de inversión.',
  },
  {
    ko: '이번 달은 건강 관리에 집중하면 좋은 결과를 얻을 수 있습니다.',
    en: 'Focusing on health care this month can bring good results.',
    zh: '这个月专注于健康管理可以获得好结果。',
    ja: '今月は健康管理に集中すれば良い結果を得られます。',
    es: 'Enfocarte en el cuidado de la salud este mes puede traer buenos resultados.',
  },
  {
    ko: '이번 달은 창의력이 빛나는 시기입니다. 아이디어를 적극적으로 펼쳐보세요.',
    en: 'This month creativity shines. Actively express your ideas.',
    zh: '这个月创造力闪耀。积极展示你的想法。',
    ja: '今月は創造力が輝く時期です。アイデアを積極的に展開してみてください。',
    es: 'Este mes la creatividad brilla. Expresa tus ideas activamente.',
  },
  {
    ko: '이번 달은 변화와 전환의 시기입니다. 과거를 정리하고 새 출발을 준비하세요.',
    en: 'This month is a time of change and transition. Organize the past and prepare for a fresh start.',
    zh: '这个月是变化和转折的时期。整理过去，准备新的出发。',
    ja: '今月は変化と転換の時期です。過去を整理し、新しい出発を準備してください。',
    es: 'Este mes es un tiempo de cambio y transición. Organiza el pasado y prepárate para un nuevo comienzo.',
  },
  {
    ko: '이번 달은 직업적 도약의 기회가 찾아옵니다. 적극적으로 기회를 잡으세요.',
    en: 'Career advancement opportunities come this month. Seize them proactively.',
    zh: '这个月有职业飞跃的机会。积极抓住机会。',
    ja: '今月はキャリアの飛躍のチャンスが訪れます。積極的にチャンスを掴んでください。',
    es: 'Oportunidades de avance profesional llegan este mes. Aprovéchalas activamente.',
  },
  {
    ko: '이번 달은 여행이나 새로운 장소가 행운을 가져다줍니다. 환경 변화를 즐기세요.',
    en: 'Travel or new places bring luck this month. Enjoy a change of scenery.',
    zh: '这个月旅行或新地方会带来好运。享受环境的变化。',
    ja: '今月は旅行や新しい場所が幸運をもたらします。環境の変化を楽しんでください。',
    es: 'Viajar o lugares nuevos traen suerte este mes. Disfruta del cambio de escenario.',
  },
  {
    ko: '이번 달은 내면의 치유와 회복에 집중하기 좋습니다. 자기 돌봄을 우선시하세요.',
    en: 'This month is great for focusing on inner healing and recovery. Prioritize self-care.',
    zh: '这个月适合专注于内心的治愈和恢复。把自我关怀放在首位。',
    ja: '今月は内面の癒しと回復に集中するのに良い時期です。セルフケアを優先してください。',
    es: 'Este mes es ideal para enfocarte en la sanación interior y la recuperación. Prioriza el autocuidado.',
  },
  {
    ko: '이번 달은 인내의 결실을 맺는 시기입니다. 꾸준한 노력이 보상받습니다.',
    en: 'This month is when patience bears fruit. Steady effort is rewarded.',
    zh: '这个月是耐心结出果实的时期。持续的努力会得到回报。',
    ja: '今月は忍耐が実を結ぶ時期です。着実な努力が報われます。',
    es: 'Este mes la paciencia da frutos. El esfuerzo constante es recompensado.',
  },
  {
    ko: '이번 달은 소통의 달입니다. 오래 연락 못 한 사람과의 재회가 행운을 부릅니다.',
    en: 'This is a month of communication. Reuniting with old contacts brings luck.',
    zh: '这个月是沟通之月。与久未联系的人重逢会带来好运。',
    ja: '今月はコミュニケーションの月です。久しぶりの人との再会が幸運を呼びます。',
    es: 'Este es un mes de comunicación. Reunirte con viejos contactos trae suerte.',
  },
  {
    ko: '이번 달은 직감이 특히 예리해지는 시기입니다. 첫 느낌을 신뢰하세요.',
    en: 'Your intuition is especially sharp this month. Trust your first impression.',
    zh: '这个月直觉特别敏锐。相信你的第一感觉。',
    ja: '今月は直感が特に鋭くなる時期です。最初の感覚を信頼してください。',
    es: 'Tu intuición es especialmente aguda este mes. Confía en tu primera impresión.',
  },
  {
    ko: '이번 달 후반으로 갈수록 운세가 상승합니다. 초반의 어려움에 좌절하지 마세요.',
    en: 'Fortune rises as the month progresses. Do not be discouraged by early difficulties.',
    zh: '随着月份推进运势上升。不要被初期的困难打倒。',
    ja: '今月は後半に向かって運勢が上昇します。前半の困難に挫折しないでください。',
    es: 'La fortuna sube a medida que avanza el mes. No te desanimes por las dificultades iniciales.',
  },
  {
    ko: '이번 달은 협력의 에너지가 강합니다. 혼자보다 함께할 때 더 큰 성과를 거둡니다.',
    en: 'Cooperative energy is strong this month. Achievements are greater together than alone.',
    zh: '这个月合作的能量很强。一起比单独做能取得更大成果。',
    ja: '今月は協力のエネルギーが強いです。一人より一緒の方がより大きな成果を収めます。',
    es: 'La energía cooperativa es fuerte este mes. Los logros son mayores juntos que solos.',
  },
];

// 행성 영향 템플릿 (월간 운세용)
export const planetaryInfluenceTemplates: LocalizedText[] = [
  {
    ko: '수성이 순행하여 커뮤니케이션과 사고력이 향상됩니다.',
    en: 'Mercury is in direct motion, improving communication and thinking.',
    zh: '水星顺行，沟通和思维能力提升。',
    ja: '水星が順行し、コミュニケーションと思考力が向上します。',
    es: 'Mercurio está en movimiento directo, mejorando la comunicación y el pensamiento.',
  },
  {
    ko: '금성의 영향으로 사랑과 아름다움에 대한 감각이 높아집니다.',
    en: 'Venus influences heighten your sense of love and beauty.',
    zh: '金星的影响使对爱和美的感觉增强。',
    ja: '金星の影響で愛と美への感覚が高まります。',
    es: 'Las influencias de Venus aumentan tu sentido del amor y la belleza.',
  },
  {
    ko: '화성의 에너지가 활력과 행동력을 부여합니다.',
    en: 'Mars energy provides vitality and drive.',
    zh: '火星的能量赋予活力和行动力。',
    ja: '火星のエネルギーが活力と行動力を与えます。',
    es: 'La energía de Marte proporciona vitalidad e impulso.',
  },
  {
    ko: '목성의 축복으로 행운과 확장의 기회가 찾아옵니다.',
    en: 'Jupiter blessings bring opportunities for luck and expansion.',
    zh: '木星的祝福带来幸运和扩展的机会。',
    ja: '木星の祝福により幸運と拡大のチャンスが訪れます。',
    es: 'Las bendiciones de Júpiter traen oportunidades de suerte y expansión.',
  },
  {
    ko: '토성이 책임감과 인내심을 요구하지만 성장의 기회를 제공합니다.',
    en: 'Saturn demands responsibility and patience but offers growth opportunities.',
    zh: '土星要求责任感和耐心，但提供成长的机会。',
    ja: '土星が責任感と忍耐を求めますが、成長の機会を提供します。',
    es: 'Saturno exige responsabilidad y paciencia pero ofrece oportunidades de crecimiento.',
  },
];

// 요일 이름 (다국어)
export const dayNames: LocalizedText[] = [
  { ko: '일요일', en: 'Sunday', zh: '星期日', ja: '日曜日', es: 'Domingo' },
  { ko: '월요일', en: 'Monday', zh: '星期一', ja: '月曜日', es: 'Lunes' },
  { ko: '화요일', en: 'Tuesday', zh: '星期二', ja: '火曜日', es: 'Martes' },
  { ko: '수요일', en: 'Wednesday', zh: '星期三', ja: '水曜日', es: 'Miércoles' },
  { ko: '목요일', en: 'Thursday', zh: '星期四', ja: '木曜日', es: 'Jueves' },
  { ko: '금요일', en: 'Friday', zh: '星期五', ja: '金曜日', es: 'Viernes' },
  { ko: '토요일', en: 'Saturday', zh: '星期六', ja: '土曜日', es: 'Sábado' },
];
