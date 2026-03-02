/**
 * 원소별 운세 템플릿
 * Fire(불), Earth(흙), Air(공기), Water(물) 각 원소의 특성을 반영한 운세 텍스트
 */

import type { LocalizedText, HoroscopeCategory } from '@/types';

export type Element = 'fire' | 'earth' | 'air' | 'water';

export interface ElementTemplates {
  overall: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  love: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  career: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  health: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
  money: { high: LocalizedText[]; medium: LocalizedText[]; low: LocalizedText[] };
}

// Fire (불) - 양자리, 사자자리, 사수자리
const fireTemplates: ElementTemplates = {
  overall: {
    high: [
      {
        ko: '오늘은 당신 내면의 불꽃이 그 어느 때보다 강하게 타오릅니다. 이 뜨거운 에너지는 주변 사람들도 느낄 수 있을 만큼 강렬하며, 당신이 향하는 모든 방향에서 돌파구를 열어줍니다. 두려움 없이 도전하세요—오늘 당신에게 불가능은 없습니다.',
        en: 'Your inner flame burns brighter today than ever before, radiating an intensity that others around you can feel. Every direction you turn holds the potential for a breakthrough. Step forward without fear—today, nothing is beyond your reach.',
        zh: '今天你内心的火焰比以往任何时候都燃烧得更旺盛，这股热能足以让周围的人感受到。毫无畏惧地迎接挑战吧，今天没有什么是不可能的。',
        ja: '今日はあなたの内なる炎が今まで以上に強く燃え上がっています。その熱いエネルギーは周りの人も感じ取れるほど強烈で、あなたが向かうすべての方向で突破口を開いてくれます。恐れず挑戦してください—今日のあなたに不可能はありません。',
        es: 'Hoy tu llama interior arde más fuerte que nunca, con una intensidad que quienes te rodean pueden sentir. Cada dirección que tomes ofrece potencial para un avance real. Avanza sin miedo—hoy nada está fuera de tu alcance.',
      },
      {
        ko: '당신의 용기가 태양처럼 빛나는 시기입니다. 지금까지 망설였던 그 일이 있다면, 오늘이 바로 첫걸음을 내딛을 날입니다. 당신의 열정은 단순한 감정이 아니라 현실을 바꾸는 힘이 되고 있습니다.',
        en: 'Your courage shines like the sun today, illuminating paths that once seemed hidden. If there is something you have been hesitant about, today is the day to take that first step. Your passion is not just a feeling—it is a force that is actively reshaping your reality.',
        zh: '你的勇气如太阳般闪耀。如果有你一直犹豫的事情，今天就是迈出第一步的日子。你的热情正在成为改变现实的力量。',
        ja: 'あなたの勇気が太陽のように輝く時期です。今まで躊躇していたことがあれば、今日こそ最初の一歩を踏み出す日です。あなたの情熱は単なる感情ではなく、現実を変える力となっています。',
        es: 'Tu coraje brilla como el sol hoy, iluminando caminos que antes parecían ocultos. Si hay algo en lo que has dudado, hoy es el día de dar ese primer paso. Tu pasión no es solo un sentimiento—es una fuerza que está remodelando activamente tu realidad.',
      },
      {
        ko: '강렬한 불의 에너지가 당신 앞의 모든 장애물을 태워버립니다. 오늘은 저항이 약해지고 길이 열리는 날로, 당신의 의지가 빛을 발합니다. 승리는 이미 당신 것입니다—그것을 향해 당당히 걸어가세요.',
        en: 'Intense fire energy is burning away every obstacle in your path today, and resistance melts where your will is focused. The road opens for those who move decisively. Victory is already yours—walk toward it with confidence.',
        zh: '强烈的火焰能量正在烧尽你前方的所有障碍，抵抗在你意志聚焦的地方融化。胜利已经属于你——自信地向前走吧。',
        ja: '強烈な炎のエネルギーがあなたの前のすべての障害を焼き払います。今日は抵抗が弱まり道が開ける日で、あなたの意志が輝きを放ちます。勝利はすでにあなたのものです—それに向かって堂々と歩んでください。',
        es: 'La intensa energía del fuego está quemando cada obstáculo en tu camino hoy, y la resistencia se derrite donde se enfoca tu voluntad. La victoria ya es tuya—camina hacia ella con confianza.',
      },
    ],
    medium: [
      {
        ko: '오늘은 넘치는 에너지를 한 가지 방향으로 집중하는 것이 핵심입니다. 불꽃이 강할수록 방향을 잘 잡아야 더 멀리 타오르듯, 당신의 열정도 올바른 목표를 향해 모아질 때 가장 빛납니다. 지금 가장 중요한 것 하나를 선택하고 그것에만 집중해보세요.',
        en: 'Channeling your abundant energy into a single direction is the key today. Just as a flame burns farther when guided well, your passion shines brightest when aimed at the right target. Choose the one thing that matters most right now and give it your full focus.',
        zh: '今天的关键是将充沛的能量集中在一个方向上。就像火焰方向对了才能燃烧得更远一样，你的热情在瞄准正确目标时最为耀眼。选择现在最重要的一件事，专注于它。',
        ja: '今日は溢れるエネルギーを一つの方向に集中させることが重要です。炎は方向をうまく定めるほど遠くまで燃え上がるように、あなたの情熱も正しい目標に向けられた時に最も輝きます。今最も重要なことを一つ選び、そこにだけ集中してみてください。',
        es: 'Canalizar tu abundante energía en una sola dirección es la clave hoy. Al igual que una llama arde más lejos cuando se guía bien, tu pasión brilla más cuando apunta al objetivo correcto. Elige la cosa más importante ahora mismo y dale todo tu enfoque.',
      },
      {
        ko: '열정은 있지만 방향이 분산될 수 있는 날입니다. 서두르지 않고 한 발 물러서서 보면, 지금 어디에 힘을 써야 할지가 훨씬 명확하게 보입니다. 때로는 잠깐 멈추는 것이 더 빠르게 목표에 도달하는 길입니다.',
        en: 'You have the fire today, but it risks scattering in too many directions. Stepping back for a moment reveals where your energy is most needed. Sometimes a brief pause is the fastest route to your goal.',
        zh: '你有热情，但今天能量可能分散。退一步看看，哪里最需要你的力量会更清晰。有时候短暂停顿是更快到达目标的路。',
        ja: '情熱はあるけれど方向が分散する可能性がある日です。急がずに一歩引いて見ると、今どこに力を使うべきかがずっと明確に見えてきます。時に少し立ち止まることが、目標により早く到達する道です。',
        es: 'Tienes el fuego hoy, pero corre el riesgo de dispersarse en demasiadas direcciones. Dar un paso atrás por un momento revela dónde más se necesita tu energía. A veces una breve pausa es la ruta más rápida hacia tu meta.',
      },
      {
        ko: '행동하고 싶은 충동이 강하게 느껴지지만, 오늘은 한 번 더 생각하는 것이 현명합니다. 불꽃도 산소가 필요하듯, 당신의 계획도 숨 쉴 공간이 있어야 더 크게 타오릅니다. 잠깐 멈춰 생각을 정리하면 훨씬 좋은 결과가 기다립니다.',
        en: 'The impulse to act is strong today, but pausing to think once more is the wiser move. Just as fire needs oxygen to sustain itself, your plans need breathing room to grow. A moment of reflection will lead to far better outcomes.',
        zh: '行动的冲动很强烈，但今天再想一想更明智。就像火焰需要氧气一样，你的计划也需要呼吸的空间才能更旺盛。稍作停顿整理思路，会有更好的结果。',
        ja: '行動したい衝動が強く感じられますが、今日はもう一度考えることが賢明です。炎も酸素が必要なように、あなたの計画も呼吸する空間があってこそより大きく燃え上がります。少し立ち止まって考えを整理すれば、ずっと良い結果が待っています。',
        es: 'El impulso de actuar es fuerte hoy, pero hacer una pausa para pensar una vez más es la decisión más sabia. Al igual que el fuego necesita oxígeno para sostenerse, tus planes necesitan espacio para crecer. Un momento de reflexión llevará a resultados mucho mejores.',
      },
    ],
    low: [
      {
        ko: '모든 불꽃은 때때로 낮게 타오르며 내일을 위한 힘을 모읍니다. 이 시간은 낭비가 아니라 더 크게 타오르기 위한 준비의 과정임을 기억하세요. 오늘은 쉬고 채우는 것이 내일의 성공을 만드는 가장 현명한 선택입니다.',
        en: 'Every flame burns low sometimes, quietly gathering strength for tomorrow. This period is not wasted time—it is the preparation for an even greater blaze. Today, resting and replenishing is the wisest choice you can make for your future success.',
        zh: '每一个火焰有时都会低燃，为明天积蓄力量。这段时间不是浪费，而是为更大燃烧做准备。今天休息和补充是为明天成功最明智的选择。',
        ja: 'すべての炎は時に低く燃えて、明日のための力を蓄えます。この時間は無駄ではなく、より大きく燃え上がるための準備の過程であることを覚えておいてください。今日は休んで満たすことが、明日の成功を作る最も賢明な選択です。',
        es: 'Toda llama arde bajo a veces, reuniendo silenciosamente fuerzas para mañana. Este período no es tiempo desperdiciado—es la preparación para un incendio aún mayor. Hoy, descansar y reponer es la elección más sabia que puedes hacer para tu éxito futuro.',
      },
      {
        ko: '불꽃이 약해진 날에는 억지로 타오르려 하면 오히려 꺼질 수 있습니다. 지금은 연료를 다시 채우는 시간입니다. 잠시 쉬어가며 내일의 도전을 위한 힘을 조용히 모으세요.',
        en: 'On a day when your flame feels low, forcing it to burn can snuff it out entirely. This is a time to refuel rather than push. Rest quietly and gather the strength you will need for tomorrow\'s challenges.',
        zh: '火焰减弱的日子里，强迫自己燃烧反而可能熄灭。现在是重新补充燃料的时间。稍作休息，为明天的挑战积蓄力量。',
        ja: '炎が弱まった日に無理に燃えようとすると、かえって消えてしまう可能性があります。今は燃料を補充する時間です。少し休んで明日の挑戦のための力を静かに蓄えてください。',
        es: 'En un día en que tu llama se siente baja, forzarla a arder puede apagarla por completo. Este es el momento de reabastecerte en lugar de empujar. Descansa tranquilamente y reúne la fuerza que necesitarás para los desafíos de mañana.',
      },
      {
        ko: '충동적으로 움직이고 싶은 날이지만, 오늘만큼은 신중함이 당신의 가장 강력한 무기입니다. 불을 다루는 사람은 불길을 두려워하지 않지만 언제 멈춰야 하는지도 압니다. 오늘의 인내가 내일의 더 빛나는 승리를 만들어줍니다.',
        en: 'The urge to move impulsively is real today, but caution is your most powerful tool right now. Those who master fire know not only its power but also when to hold back. Today\'s patience is building the foundation for a brighter victory tomorrow.',
        zh: '冲动行事的冲动很强，但今天谨慎是你最强大的武器。掌握火的人不仅知道它的力量，也知道何时该停下。今天的耐心正在为明天更辉煌的胜利奠定基础。',
        ja: '衝動的に動きたい日ですが、今日こそ慎重さがあなたの最も強力な武器です。火を扱う人は炎を恐れませんが、いつ止まるべきかも知っています。今日の忍耐が明日のより輝かしい勝利を作り出します。',
        es: 'El impulso de moverse impulsivamente es real hoy, pero la cautela es tu herramienta más poderosa ahora mismo. Quienes dominan el fuego conocen no solo su poder sino también cuándo contenerse. La paciencia de hoy está construyendo los cimientos para una victoria más brillante mañana.',
      },
    ],
  },
  love: {
    high: [
      {
        ko: '오늘 당신의 사랑 에너지는 불꽃처럼 뜨겁고 진실하게 타오릅니다. 이 열정은 상대방이 분명히 느낄 수 있으며, 용감하게 표현할수록 더 강하게 연결됩니다. 지금 이 순간, 망설임 없이 당신의 마음을 전하세요.',
        en: 'Your love energy blazes hot and true today, unmistakable to anyone near you. The more boldly you express it, the deeper the connection becomes. In this moment, share your heart without hesitation.',
        zh: '今天你的爱情能量如火焰般炽热真诚。这份热情对方一定能感受到，越勇敢地表达，连接就越深。此刻，毫不犹豫地传达你的心意。',
        ja: '今日のあなたの愛のエネルギーは炎のように熱く真実に燃え上がっています。この情熱は相手が必ず感じることができ、勇気を持って表現するほどより強くつながります。今この瞬間、躊躇なくあなたの気持ちを伝えてください。',
        es: 'Tu energía amorosa arde caliente y verdadera hoy, inconfundible para quien esté cerca. Cuanto más audazmente la expreses, más profunda se vuelve la conexión. En este momento, comparte tu corazón sin vacilación.',
      },
      {
        ko: '당신의 매력이 태양처럼 빛나고 있습니다. 주변 사람들은 이미 당신에게 끌리고 있으며, 그 불꽃 같은 존재감이 사랑을 자연스럽게 당겨옵니다. 자신을 믿고 당당하게 사랑을 쟁취할 시간입니다.',
        en: 'Your charm is radiating like sunlight today, drawing people toward you naturally. That fiery presence you carry is pulling love in your direction without effort. Trust yourself—it is time to claim the love you deserve.',
        zh: '你的魅力如阳光般照耀。周围的人已经被你吸引，那火焰般的存在感自然地吸引着爱情。相信自己——是时候赢得你值得拥有的爱了。',
        ja: 'あなたの魅力が太陽のように輝いています。周りの人はすでにあなたに引き寄せられており、その炎のような存在感が自然に愛を引き寄せています。自分を信じて堂々と愛を勝ち取る時です。',
        es: 'Tu encanto irradia como la luz del sol hoy, atrayendo naturalmente a las personas hacia ti. Esa presencia ardiente que llevas está atrayendo el amor en tu dirección sin esfuerzo. Confía en ti mismo—es hora de reclamar el amor que mereces.',
      },
      {
        ko: '용기 있는 고백이 성공할 확률이 그 어느 때보다 높은 날입니다. 사랑은 기다리는 자에게 오기도 하지만, 오늘은 불꽃처럼 먼저 다가가는 자에게 더 크게 보답합니다. 지금이 바로 그 기회입니다—마음을 전하세요.',
        en: 'Today the odds of a heartfelt confession succeeding are higher than ever. Love sometimes rewards those who wait, but today it rewards those who leap forward like a flame. This is your chance—speak your heart.',
        zh: '今天勇敢表白成功的概率比以往任何时候都高。爱情有时眷顾等待的人，但今天更眷顾像火焰一样主动出击的人。现在就是那个机会——传达你的心意。',
        ja: '勇気ある告白が成功する確率がこれまでになく高い日です。愛は待つ者にも来ますが、今日は炎のように先に近づく者により大きく報いてくれます。今がまさにそのチャンスです—気持ちを伝えてください。',
        es: 'Hoy las probabilidades de que una confesión sincera tenga éxito son más altas que nunca. El amor a veces recompensa a quienes esperan, pero hoy recompensa a quienes se lanzan hacia adelante como una llama. Esta es tu oportunidad—habla desde el corazón.',
      },
    ],
    medium: [
      {
        ko: '사랑에서도 불꽃 같은 열정이 있지만, 오늘은 그 열기를 부드럽게 조율하는 것이 관계를 더 깊게 만듭니다. 상대방의 리듬에 귀 기울이면 당신의 열정이 더욱 잘 전달됩니다. 차분하게 접근할수록 오히려 더 강한 인상을 남깁니다.',
        en: 'Your passionate fire is present in love today, but gently modulating that heat will deepen the relationship more than intensity alone. Listening to your partner\'s rhythm allows your passion to land more meaningfully. A calmer approach leaves a stronger impression.',
        zh: '今天爱情中有火焰般的热情，但温和地调节那股热度会比单纯的强烈更能加深关系。倾听对方的节奏让你的热情传达得更好。越平静地接近，反而留下更强烈的印象。',
        ja: '恋愛においても炎のような情熱がありますが、今日はその熱さをそっと調整することが関係をより深くします。相手のリズムに耳を傾けると、あなたの情熱がより上手く伝わります。落ち着いてアプローチするほど、かえってより強い印象を残します。',
        es: 'Tu fuego apasionado está presente en el amor hoy, pero modular suavemente ese calor profundizará la relación más que la intensidad sola. Escuchar el ritmo de tu pareja permite que tu pasión llegue de manera más significativa. Un enfoque más tranquilo deja una impresión más fuerte.',
      },
      {
        ko: '열정과 배려는 사랑의 두 날개입니다. 오늘은 타오르는 감정을 상대방을 향한 따뜻한 관심으로 전환해보세요. 당신의 열정이 상대를 압도하지 않고 감싸줄 때, 사랑은 더 단단하게 자랍니다.',
        en: 'Passion and care are the two wings of love. Today, try converting your burning feelings into warm attention directed toward your partner. When your passion embraces rather than overwhelms, love grows more solid.',
        zh: '热情和关怀是爱情的两翼。今天，试着将燃烧的情感转化为对对方温暖的关注。当你的热情是拥抱而不是压倒时，爱情会更加坚实地成长。',
        ja: '情熱と思いやりは愛の二つの翼です。今日は燃え上がる感情を相手への温かい関心に変換してみてください。あなたの情熱が相手を圧倒するのではなく包み込む時、愛はより強固に育ちます。',
        es: 'La pasión y el cuidado son las dos alas del amor. Hoy, intenta convertir tus sentimientos ardientes en atención cálida dirigida hacia tu pareja. Cuando tu pasión abraza en lugar de abrumar, el amor crece más sólido.',
      },
      {
        ko: '상대방의 페이스를 존중하는 것도 불꽃 같은 용기가 필요한 행동입니다. 오늘은 당신의 열정을 잠시 내려놓고 상대방이 원하는 것을 먼저 들어보세요. 그 한 걸음 물러섬이 관계를 훨씬 앞으로 나아가게 할 것입니다.',
        en: 'Respecting your partner\'s pace takes a different kind of fiery courage. Today, set aside your own drive for a moment and truly listen to what they need. That single step back will move the relationship further forward than any bold advance.',
        zh: '尊重对方的节奏也是需要火焰般勇气的行为。今天，暂时放下你的热情，先倾听对方想要什么。那一步退让会让关系前进得更远。',
        ja: '相手のペースを尊重することも炎のような勇気が必要な行動です。今日はあなたの情熱を少し脇に置いて、相手が求めるものをまず聞いてみてください。その一歩引くことが関係をずっと前に進めてくれるでしょう。',
        es: 'Respetar el ritmo de tu pareja requiere un tipo diferente de valentía ardiente. Hoy, deja de lado tu propio impulso por un momento y escucha verdaderamente lo que necesitan. Ese único paso atrás moverá la relación más hacia adelante que cualquier avance audaz.',
      },
    ],
    low: [
      {
        ko: '불꽃 같은 감정이 오늘은 방향을 잃고 충돌을 일으킬 수 있습니다. 한 발 물러서서 상황 전체를 보는 것이 지금 가장 용감한 선택입니다. 불은 바람을 만나면 더 커질 수도, 꺼질 수도 있다는 것을 기억하세요.',
        en: 'Your fiery emotions may lose direction today and spark conflict instead of connection. Stepping back to view the full picture is the bravest choice you can make right now. Remember that fire meeting wind can either grow larger or be extinguished entirely.',
        zh: '今天火焰般的情感可能失去方向，引发冲突而非连接。退一步看清全局是现在最勇敢的选择。记住，火遇风可能越烧越旺，也可能被熄灭。',
        ja: '炎のような感情が今日は方向を失い、衝突を引き起こす可能性があります。一歩引いて状況全体を見ることが今最も勇敢な選択です。炎は風に会うとより大きくなることも、消えることもあることを忘れないでください。',
        es: 'Tus emociones ardientes pueden perder dirección hoy y provocar conflicto en lugar de conexión. Dar un paso atrás para ver el panorama completo es la elección más valiente que puedes hacer ahora mismo. Recuerda que el fuego al encontrar el viento puede crecer más o ser extinguido por completo.',
      },
      {
        ko: '성급한 결정이 후회를 부르는 날입니다. 지금 느끼는 감정이 강렬할수록 더 신중하게 행동해야 합니다. 사랑의 불꽃은 오래 타오를 때 진정한 가치를 지닙니다—오늘은 그 불꽃을 지키는 데 집중하세요.',
        en: 'Hasty decisions are likely to bring regret today. The more intense your feelings, the more carefully you must act. A love flame has its greatest value when it burns long—today, focus on protecting that flame rather than fanning it recklessly.',
        zh: '今天仓促的决定容易带来后悔。感情越强烈，行动就需要越谨慎。爱的火焰在持久燃烧时才有真正的价值——今天专注于守护那份火焰。',
        ja: '性急な決定が後悔を招く日です。今感じる感情が強烈なほど、より慎重に行動しなければなりません。愛の炎は長く燃え続ける時に本当の価値を持ちます—今日はその炎を守ることに集中してください。',
        es: 'Las decisiones apresuradas probablemente traerán arrepentimiento hoy. Cuanto más intensos sean tus sentimientos, más cuidadosamente debes actuar. Una llama de amor tiene su mayor valor cuando arde por mucho tiempo—hoy, enfócate en proteger esa llama en lugar de avivarla imprudentemente.',
      },
      {
        ko: '오늘은 사랑보다 자기 자신에게 집중하는 것이 가장 현명한 선택입니다. 불꽃도 자신의 연료가 충분할 때 비로소 다른 것을 밝힐 수 있습니다. 자신을 먼저 돌보는 오늘이, 더 빛나는 사랑의 내일을 준비하는 과정입니다.',
        en: 'Today the wisest choice is to focus on yourself rather than on love. A flame can only illuminate others when its own fuel is sufficient. Taking care of yourself today is the preparation for a more radiant love tomorrow.',
        zh: '今天最明智的选择是专注于自己而不是爱情。火焰只有在自己的燃料充足时，才能照亮其他事物。今天先照顾好自己，是为明天更闪耀的爱情做准备。',
        ja: '今日は恋愛よりも自分自身に集中することが最も賢明な選択です。炎も自分の燃料が十分な時にこそ他のものを照らすことができます。自分を先に大切にする今日が、より輝く愛の明日を準備する過程です。',
        es: 'Hoy la elección más sabia es enfocarte en ti mismo en lugar de en el amor. Una llama solo puede iluminar a otros cuando su propio combustible es suficiente. Cuidarte hoy es la preparación para un amor más radiante mañana.',
      },
    ],
  },
  career: {
    high: [
      {
        ko: '리더십을 발휘할 절호의 기회가 오늘 당신 앞에 펼쳐집니다. 당신의 열정과 추진력은 팀 전체에 불꽃처럼 퍼져나가며, 사람들은 자연스럽게 당신을 따르게 됩니다. 앞장서는 것을 두려워하지 마세요—오늘 당신의 자리는 맨 앞입니다.',
        en: 'A golden opportunity to exercise leadership unfolds before you today. Your passion and drive spread like fire through the entire team, and people will naturally follow your lead. Do not fear stepping to the front—your place today is at the very head.',
        zh: '今天展现领导力的绝佳机会在你面前展开。你的热情和推动力如火焰般蔓延到整个团队，人们自然会跟随你。不要害怕站出来带头——今天你的位置就在最前面。',
        ja: 'リーダーシップを発揮する絶好のチャンスが今日あなたの前に広がっています。あなたの情熱と推進力はチーム全体に炎のように広がり、人々は自然とあなたについてきます。先頭に立つことを恐れないでください—今日のあなたの場所は最前列です。',
        es: 'Una oportunidad de oro para ejercer liderazgo se despliega ante ti hoy. Tu pasión e impulso se propagan como fuego por todo el equipo, y las personas te seguirán naturalmente. No temas dar un paso al frente—tu lugar hoy está a la cabeza.',
      },
      {
        ko: '도전적인 프로젝트에서 당신의 불꽃 같은 에너지가 진가를 발휘합니다. 남들이 어렵다고 여기는 곳에서 당신은 오히려 더 빛납니다. 적극적으로 나서는 것을 주저하지 마세요—이 순간 당신이 팀의 열쇠입니다.',
        en: 'Your fire energy shows its true worth in the most challenging projects today. Where others see difficulty, you shine brightest. Do not hesitate to step up proactively—at this moment, you are the key to the team\'s success.',
        zh: '在挑战性项目中，你火焰般的能量今天发挥出真正的价值。在别人认为困难的地方，你反而更加耀眼。不要犹豫积极出击——此刻你是团队的关键。',
        ja: '挑戦的なプロジェクトで、あなたの炎のようなエネルギーが本領を発揮します。他の人が難しいと思う場所で、あなたはかえってより輝きます。積極的に出ることを躊躇しないでください—この瞬間、あなたがチームの鍵です。',
        es: 'Tu energía de fuego muestra su verdadero valor en los proyectos más desafiantes hoy. Donde otros ven dificultad, tú brillas más. No dudes en dar un paso al frente de manera proactiva—en este momento, eres la clave del éxito del equipo.',
      },
      {
        ko: '당신의 추진력이 팀 전체를 성공으로 이끄는 날입니다. 열정 있는 한 사람이 집단 전체의 방향을 바꿀 수 있다는 것을 오늘 몸소 보여주세요. 당신의 불꽃이 팀의 불꽃이 됩니다.',
        en: 'Your drive is the force leading the entire team toward success today. Show through your actions that one passionate person can change the direction of the whole group. Your flame becomes the team\'s flame.',
        zh: '今天你的推动力引领整个团队走向成功。用行动证明，一个充满热情的人可以改变整个集体的方向。你的火焰成为团队的火焰。',
        ja: 'あなたの推進力がチーム全体を成功に導く日です。情熱を持った一人が集団全体の方向を変えることができると、今日は身をもって示してください。あなたの炎がチームの炎となります。',
        es: 'Tu impulso es la fuerza que lleva a todo el equipo hacia el éxito hoy. Demuestra a través de tus acciones que una persona apasionada puede cambiar la dirección de todo el grupo. Tu llama se convierte en la llama del equipo.',
      },
    ],
    medium: [
      {
        ko: '꾸준한 노력이 드디어 인정받기 시작하는 시기입니다. 불꽃은 지속적으로 타오를 때 가장 따뜻하듯, 지속된 헌신이 지금 빛을 발하고 있습니다. 묵묵히 해온 일들이 당신의 가장 강력한 증거입니다.',
        en: 'This is the period when your steady effort is finally starting to be recognized. Just as a flame is warmest when it burns consistently, your sustained commitment is now shining through. The work you have done quietly is your most powerful proof.',
        zh: '这是你稳定努力终于开始得到认可的时期。就像火焰持续燃烧时最温暖，你持续的投入现在正在发光。你默默做过的事情是你最有力的证明。',
        ja: '着実な努力がついに認められ始める時期です。炎は継続的に燃え続ける時に最も温かいように、持続したコミットメントが今輝きを放っています。黙々とやってきたことが、あなたの最も強力な証拠です。',
        es: 'Este es el período en que tu esfuerzo constante finalmente está comenzando a ser reconocido. Al igual que una llama es más cálida cuando arde consistentemente, tu compromiso sostenido está brillando ahora. El trabajo que has realizado en silencio es tu prueba más poderosa.',
      },
      {
        ko: '팀워크와 개인 역량 모두를 빛내야 하는 균형의 날입니다. 불꽃이 너무 강하면 주변을 태워버리지만, 적절한 온도는 모두를 따뜻하게 합니다. 오늘 당신의 에너지를 협력의 방향으로 조율해보세요.',
        en: 'Today calls for balancing both your individual brilliance and your role within the team. A flame too strong scorches everything around it, but the right temperature warms everyone. Try directing your energy toward collaboration today.',
        zh: '今天需要平衡个人能力和团队合作两方面。火焰太强会灼伤周围，但适当的温度能温暖所有人。今天试着将你的能量调向合作的方向。',
        ja: 'チームワークと個人の能力の両方を輝かせなければならないバランスの日です。炎が強すぎると周りを燃やしてしまいますが、適切な温度はみんなを温かくします。今日はあなたのエネルギーを協力の方向に調整してみてください。',
        es: 'Hoy se requiere equilibrar tanto tu brillo individual como tu papel dentro del equipo. Una llama demasiado fuerte quema todo a su alrededor, pero la temperatura adecuada calienta a todos. Intenta dirigir tu energía hacia la colaboración hoy.',
      },
      {
        ko: '작은 성과들이 모여 큰 불꽃이 됩니다. 오늘의 작은 진전을 가볍게 여기지 마세요—그것이 내일의 큰 성공의 불씨가 됩니다. 한 단계씩 나아가는 당신을 믿으세요.',
        en: 'Small achievements accumulate into a great flame. Do not undervalue today\'s small progress—it is the spark that will ignite tomorrow\'s major success. Trust yourself as you advance one step at a time.',
        zh: '小成就积累成大火焰。不要轻视今天的小进步——它是点燃明天重大成功的火花。相信一步一步前进的自己。',
        ja: '小さな成果が集まって大きな炎になります。今日の小さな進展を軽く見ないでください—それが明日の大きな成功の火種となります。一歩一歩進む自分を信じてください。',
        es: 'Los pequeños logros se acumulan en una gran llama. No subestimes el pequeño progreso de hoy—es la chispa que encenderá el gran éxito de mañana. Confía en ti mismo mientras avanzas un paso a la vez.',
      },
    ],
    low: [
      {
        ko: '직장에서의 갈등이 생길 수 있는 날이지만, 냉정을 유지하는 것이 가장 강한 대응입니다. 불을 불로 맞서면 더 큰 화재가 될 뿐입니다. 오늘은 침착함이 당신의 가장 빛나는 능력입니다.',
        en: 'Workplace conflict may arise today, but maintaining calm is the strongest response. Fighting fire with fire only creates a larger blaze. Today, your composure is your most impressive skill.',
        zh: '今天工作中可能出现冲突，但保持冷静是最强的应对。以火攻火只会造成更大的火灾。今天，沉着冷静是你最耀眼的能力。',
        ja: '職場での衝突が起きる可能性がある日ですが、冷静を保つことが最も強い対応です。火に火で対抗するとより大きな火災になるだけです。今日は落ち着きがあなたの最も輝く能力です。',
        es: 'Pueden surgir conflictos en el trabajo hoy, pero mantener la calma es la respuesta más fuerte. Combatir el fuego con fuego solo crea un incendio mayor. Hoy, tu compostura es tu habilidad más impresionante.',
      },
      {
        ko: '급한 결정보다 신중한 판단이 필요한 시기입니다. 불꽃은 서두를수록 연료를 빨리 소모합니다. 오늘은 천천히 상황을 파악하고 가장 중요한 것에 집중하는 것이 가장 현명한 전략입니다.',
        en: 'Careful judgment is needed over hasty decisions today. The more a flame rushes, the faster it burns through its fuel. Taking time to assess the situation and focusing on what truly matters is the wisest strategy.',
        zh: '今天需要谨慎判断而非仓促决定。火焰越急，燃料消耗越快。今天慢慢了解情况，专注于最重要的事，是最明智的策略。',
        ja: '急いた決定より慎重な判断が必要な時期です。炎は急ぐほど燃料を素早く消費します。今日はゆっくり状況を把握し、最も重要なことに集中することが最も賢明な戦略です。',
        es: 'Se necesita juicio cuidadoso sobre decisiones apresuradas hoy. Cuanto más rápido corre una llama, más rápido consume su combustible. Tomarse el tiempo para evaluar la situación y enfocarse en lo que realmente importa es la estrategia más sabia.',
      },
      {
        ko: '혼자 해결하려 하지 말고 동료의 도움을 구하는 것이 오늘의 용기입니다. 불꽃도 함께 타오를 때 더 크고 오래갑니다. 도움을 받는 것은 약함이 아니라, 더 강한 불꽃을 만드는 현명함입니다.',
        en: 'Seeking help from colleagues is the true act of courage today, not solving everything alone. Flames burn larger and longer when they burn together. Accepting help is not weakness—it is the wisdom that creates a stronger fire.',
        zh: '今天真正的勇气不是独自解决，而是寻求同事的帮助。火焰在一起燃烧时更大更持久。接受帮助不是软弱——而是创造更强火焰的智慧。',
        ja: '一人で解決しようとせず、同僚の助けを求めることが今日の勇気です。炎も共に燃え上がる時により大きく長続きします。助けを受けることは弱さではなく、より強い炎を作る賢明さです。',
        es: 'Buscar la ayuda de colegas es el verdadero acto de valentía hoy, no resolver todo solo. Las llamas arden más grandes y duran más cuando arden juntas. Aceptar ayuda no es debilidad—es la sabiduría que crea un fuego más fuerte.',
      },
    ],
  },
  health: {
    high: [
      {
        ko: '몸 안의 에너지가 넘쳐 활활 타오르는 날입니다. 이 생동감은 오늘 당신의 모든 움직임에 실려 있으며, 활동적인 운동이 이 에너지를 더욱 빛나게 합니다. 몸이 원하는 대로 움직이게 해주세요—오늘은 당신의 몸이 최고의 상태입니다.',
        en: 'Your body is burning with overflowing energy today. That vitality is present in every movement you make, and active exercise will make this energy shine even brighter. Let your body move as it wants—today it is in its peak state.',
        zh: '今天体内能量充沛，活力四射。这种活力体现在你的每一个动作中，积极运动会让这份能量更加耀眼。让身体随心所欲地动——今天你的身体处于最佳状态。',
        ja: '体の中のエネルギーが溢れて燃え上がる日です。この生命感は今日のあなたのすべての動きに乗っており、活動的な運動がこのエネルギーをさらに輝かせます。体が望むように動かせてあげてください—今日はあなたの体が最高の状態です。',
        es: 'Tu cuerpo arde con energía desbordante hoy. Esa vitalidad está presente en cada movimiento que haces, y el ejercicio activo hará que esta energía brille aún más. Deja que tu cuerpo se mueva como quiere—hoy está en su estado máximo.',
      },
      {
        ko: '신체 활력이 절정에 달한 시기입니다. 평소보다 더 높은 강도의 운동도 거뜬히 해낼 수 있으며, 이 에너지를 새로운 스포츠나 도전에 쏟아보세요. 당신의 몸은 지금 당신을 한계 너머로 데려다줄 준비가 되어 있습니다.',
        en: 'Your physical vitality is at its peak right now. You can handle higher intensity workouts than usual, so pour this energy into a new sport or challenge. Your body is ready to carry you beyond your limits.',
        zh: '身体活力达到顶峰。你可以轻松应对比平时更高强度的运动，把这份能量投入新运动或挑战中。你的身体现在已准备好带你超越极限。',
        ja: '身体の活力が絶頂に達する時期です。普段より高い強度の運動でも軽々とこなせ、このエネルギーを新しいスポーツや挑戦に注いでみてください。あなたの体は今、あなたを限界の先へ連れていく準備ができています。',
        es: 'Tu vitalidad física está en su punto máximo ahora mismo. Puedes manejar entrenamientos de mayor intensidad que de costumbre, así que vierte esta energía en un nuevo deporte o desafío. Tu cuerpo está listo para llevarte más allá de tus límites.',
      },
      {
        ko: '열정적인 활동이 몸과 마음 모두에 활력을 불어넣는 시기입니다. 오늘의 운동은 단순한 체력 관리가 아니라 정신적 에너지까지 충전해줍니다. 몸을 움직이는 것이 곧 삶 전체에 불꽃을 다시 지피는 일입니다.',
        en: 'Passionate activity breathes vitality into both body and mind during this period. Today\'s exercise is not just physical maintenance—it also recharges your mental energy. Moving your body is the act of relighting the flame in your entire life.',
        zh: '热情的活动在这个时期为身心注入活力。今天的运动不仅仅是体力管理，还能充电精神能量。活动身体就是重新点燃整个生活火焰的行为。',
        ja: '情熱的な活動が体と心の両方に活力を吹き込む時期です。今日の運動は単なる体力管理ではなく、精神的なエネルギーも充電してくれます。体を動かすことは、人生全体に炎を再び灯す行為です。',
        es: 'La actividad apasionada infunde vitalidad tanto en el cuerpo como en la mente durante este período. El ejercicio de hoy no es solo mantenimiento físico—también recarga tu energía mental. Mover tu cuerpo es el acto de volver a encender la llama en toda tu vida.',
      },
    ],
    medium: [
      {
        ko: '규칙적인 운동 습관을 유지하는 것이 오늘의 핵심입니다. 불꽃은 지속적인 연료 공급이 있어야 꺼지지 않듯, 꾸준한 건강 습관이 당신의 에너지를 오래도록 유지시켜 줍니다. 오늘도 어제처럼 한 걸음 나아가세요.',
        en: 'Maintaining your regular exercise habit is the key today. Just as a flame needs a steady fuel supply to stay lit, consistent health habits keep your energy burning long. Take one more step forward today, just like yesterday.',
        zh: '今天的关键是保持规律的运动习惯。就像火焰需要持续的燃料供应才能不熄灭一样，坚持的健康习惯让你的能量持久保持。今天也像昨天一样迈出一步。',
        ja: '規則的な運動習慣を維持することが今日の重要事項です。炎は継続的な燃料供給があってこそ消えないように、継続した健康習慣があなたのエネルギーを長く維持させてくれます。今日も昨日のように一歩前に進みましょう。',
        es: 'Mantener tu hábito de ejercicio regular es la clave hoy. Al igual que una llama necesita un suministro constante de combustible para mantenerse encendida, los hábitos de salud consistentes mantienen tu energía ardiendo por mucho tiempo. Da un paso más hoy, igual que ayer.',
      },
      {
        ko: '무리하지 않는 선에서 활동량을 늘리는 것이 좋습니다. 불꽃도 산소가 너무 많으면 오히려 불안정해지듯, 오늘은 자신의 한계를 조금씩 확장하되 과하지 않게 조절하세요. 균형 잡힌 노력이 가장 오래 지속됩니다.',
        en: 'Gradually increasing your activity level without overdoing it is the right approach today. Just as too much oxygen can destabilize a flame, expand your limits incrementally today without going overboard. Balanced effort lasts the longest.',
        zh: '在不勉强的范围内增加活动量是好的。就像氧气太多反而会使火焰不稳定，今天逐步扩展自己的极限，但不要过度。均衡的努力持续最久。',
        ja: '無理のない範囲で活動量を増やすことが今日は良いでしょう。炎も酸素が多すぎるとかえって不安定になるように、今日は自分の限界を少しずつ広げながらも過度にならないよう調節してください。バランスのとれた努力が最も長続きします。',
        es: 'Aumentar gradualmente tu nivel de actividad sin excederte es el enfoque correcto hoy. Al igual que demasiado oxígeno puede desestabilizar una llama, expande tus límites incrementalmente hoy sin exagerar. El esfuerzo equilibrado dura más tiempo.',
      },
      {
        ko: '열정과 휴식의 균형이 건강의 비결입니다. 오늘은 불꽃처럼 뛰어오르는 에너지와 함께, 그것을 지탱하는 충분한 휴식도 챙기세요. 가장 오래 타오르는 불꽃은 항상 적절한 속도를 유지합니다.',
        en: 'The balance between passion and rest is the secret to health. Today, alongside your fire-like surging energy, also make sure to get sufficient rest to sustain it. The flame that burns longest always maintains the right pace.',
        zh: '热情与休息的平衡是健康的秘诀。今天，在火焰般涌动的能量同时，也要确保有足够的休息来支撑它。燃烧最久的火焰总是保持适当的节奏。',
        ja: '情熱と休息のバランスが健康の秘訣です。今日は炎のように跳ね上がるエネルギーとともに、それを支える十分な休息も確保してください。最も長く燃え続ける炎は常に適切なペースを維持します。',
        es: 'El equilibrio entre la pasión y el descanso es el secreto de la salud. Hoy, junto con tu energía ardiente, también asegúrate de obtener el descanso suficiente para sostenerla. La llama que arde más tiempo siempre mantiene el ritmo adecuado.',
      },
    ],
    low: [
      {
        ko: '과격한 운동은 오늘 피하는 것이 현명합니다. 불꽃도 무리하게 타오르면 순식간에 꺼지듯, 몸도 한계를 넘어서면 회복에 더 오랜 시간이 걸립니다. 오늘은 가볍고 부드러운 활동으로 몸을 돌보세요.',
        en: 'Avoiding intense exercise today is the wise choice. Just as a flame pushed too hard goes out instantly, a body taken beyond its limits takes far longer to recover. Today, care for your body with light and gentle activity.',
        zh: '今天避免剧烈运动是明智的。就像火焰过度燃烧会瞬间熄灭，身体超越极限后恢复需要更长时间。今天用轻柔的活动来照顾你的身体。',
        ja: '過激な運動は今日避けることが賢明です。炎も無理に燃えようとすると瞬く間に消えるように、体も限界を超えると回復により長い時間がかかります。今日は軽くて柔らかい活動で体を大切にしてください。',
        es: 'Evitar el ejercicio intenso hoy es la elección sabia. Al igual que una llama forzada con demasiada intensidad se apaga instantáneamente, un cuerpo llevado más allá de sus límites tarda mucho más en recuperarse. Hoy, cuida tu cuerpo con actividad ligera y suave.',
      },
      {
        ko: '몸이 보내는 신호에 귀 기울여야 하는 날입니다. 피로, 통증, 무기력함은 더 쉬어야 한다는 불꽃의 메시지입니다. 이 신호를 무시하면 더 큰 대가를 치르게 됩니다—오늘은 몸의 목소리를 믿으세요.',
        en: 'Today is a day to listen carefully to what your body is telling you. Fatigue, pain, and lethargy are the flame\'s message that more rest is needed. Ignoring these signals leads to a greater cost—trust your body\'s voice today.',
        zh: '今天要倾听身体发出的信号。疲劳、疼痛、无力感是火焰传达需要更多休息的信息。忽视这些信号会付出更大代价——今天相信身体的声音。',
        ja: '体が送るシグナルに耳を傾けるべき日です。疲労、痛み、無気力感は、もっと休む必要があるという炎のメッセージです。このシグナルを無視するとより大きな代償を払うことになります—今日は体の声を信じてください。',
        es: 'Hoy es un día para escuchar atentamente lo que tu cuerpo te está diciendo. La fatiga, el dolor y la letargia son el mensaje de la llama de que se necesita más descanso. Ignorar estas señales lleva a un mayor costo—confía en la voz de tu cuerpo hoy.',
      },
      {
        ko: '스트레스로 인한 피로가 쌓이기 쉬운 날입니다. 과도한 에너지 소비가 오늘의 몸을 약하게 만들고 있습니다. 충분한 휴식은 약함이 아니라, 내일의 더 강한 불꽃을 위한 가장 현명한 투자입니다.',
        en: 'Stress-related fatigue can accumulate easily today. Excessive energy consumption is weakening your body right now. Sufficient rest is not weakness—it is the wisest investment for a stronger flame tomorrow.',
        zh: '今天压力引起的疲劳容易积累。过度消耗能量正在削弱今天的身体。充分休息不是软弱，而是为明天更强火焰最明智的投资。',
        ja: 'ストレスによる疲労が積み重なりやすい日です。過度なエネルギー消費が今日の体を弱くしています。十分な休息は弱さではなく、明日のより強い炎のための最も賢明な投資です。',
        es: 'La fatiga relacionada con el estrés puede acumularse fácilmente hoy. El consumo excesivo de energía está debilitando tu cuerpo en este momento. El descanso suficiente no es debilidad—es la inversión más sabia para una llama más fuerte mañana.',
      },
    ],
  },
  money: {
    high: [
      {
        ko: '과감한 투자가 빛나는 결과를 가져올 수 있는 날입니다. 당신의 직감과 열정이 재정적 판단력을 날카롭게 만들고, 기회를 포착하는 속도도 남다릅니다. 오늘은 계산된 용기로 행동하세요.',
        en: 'Today bold investments can bring shining results. Your instinct and passion are sharpening your financial judgment, and your speed in seizing opportunities is remarkable. Act today with calculated courage.',
        zh: '今天大胆投资可以带来耀眼的结果。你的直觉和热情让财务判断力更加敏锐，抓住机会的速度也与众不同。今天以经过计算的勇气行动。',
        ja: '大胆な投資が輝かしい結果をもたらせる日です。あなたの直感と情熱が財政的判断力を鋭くし、チャンスを掴む速度も人並み外れています。今日は計算された勇気で行動してください。',
        es: 'Hoy las inversiones audaces pueden traer resultados brillantes. Tu instinto y pasión están agudizando tu juicio financiero, y tu velocidad para aprovechar oportunidades es notable. Actúa hoy con valentía calculada.',
      },
      {
        ko: '재물운이 불타오르는 시기입니다. 오래 기다려온 재정적 돌파구가 지금 손 닿을 곳에 있습니다. 기회를 놓치지 않으려면 지금 당장 행동하세요—이 불꽃은 기다려주지 않습니다.',
        en: 'Your financial fortune is blazing right now. The financial breakthrough you have long waited for is now within reach. Act immediately if you do not want to miss this opportunity—this flame will not wait.',
        zh: '财运正旺盛燃烧。你期待已久的财务突破现在触手可及。如果不想错过机会，现在就行动——这把火焰不会等待。',
        ja: '金運が燃え上がる時期です。長い間待ち望んでいた財政的な突破口が今、手の届く場所にあります。このチャンスを逃したくなければ今すぐ行動してください—この炎は待ってくれません。',
        es: 'Tu fortuna financiera está ardiendo ahora mismo. El avance financiero que has esperado durante mucho tiempo ahora está al alcance. Actúa de inmediato si no quieres perder esta oportunidad—esta llama no esperará.',
      },
      {
        ko: '적극적인 재테크 활동이 실질적인 수익으로 이어지는 날입니다. 행동하는 자에게 기회가 오듯, 오늘의 과감한 움직임이 재정적 풍요를 만듭니다. 미루지 말고 지금 실행하세요.',
        en: 'Active financial activities lead to real profits today. Just as opportunities come to those who act, today\'s bold moves create financial abundance. Do not delay—execute now.',
        zh: '今天积极的理财活动带来实质性收益。就像机会来到行动者身上，今天大胆的举动创造财务丰盛。不要拖延——现在就执行。',
        ja: '積極的な資産運用活動が実質的な収益につながる日です。行動する者にチャンスが来るように、今日の大胆な動きが財政的な豊かさを作り出します。先延ばしせず、今すぐ実行してください。',
        es: 'Las actividades financieras activas conducen a ganancias reales hoy. Al igual que las oportunidades vienen a quienes actúan, los movimientos audaces de hoy crean abundancia financiera. No demores—ejecuta ahora.',
      },
    ],
    medium: [
      {
        ko: '안정적인 재정 관리가 필요한 시기입니다. 불꽃 같은 충동으로 지갑을 열기 전에, 잠깐 멈추고 이것이 진정 필요한 것인지 생각해보세요. 절제된 판단이 장기적인 풍요의 열쇠입니다.',
        en: 'Stable financial management is needed during this period. Before opening your wallet with flame-like impulse, pause and ask whether this is truly necessary. Disciplined judgment is the key to long-term abundance.',
        zh: '这个时期需要稳定的财务管理。在冲动地打开钱包之前，先停下来想想这是否真的必要。有节制的判断是长期丰盛的关键。',
        ja: '安定した財務管理が必要な時期です。炎のような衝動で財布を開ける前に、少し立ち止まってこれが本当に必要なものかを考えてみてください。節制された判断が長期的な豊かさの鍵です。',
        es: 'Se necesita gestión financiera estable durante este período. Antes de abrir tu billetera con impulso ardiente, haz una pausa y pregúntate si esto es verdaderamente necesario. El juicio disciplinado es la clave para la abundancia a largo plazo.',
      },
      {
        ko: '충동구매를 자제하고 계획적으로 지출하는 날입니다. 지금 당장 타오르는 욕구보다 미래의 풍요를 위해 오늘의 불꽃을 조절해보세요. 현명한 절제가 나중에 더 큰 보상으로 돌아옵니다.',
        en: 'Today is for restraining impulse purchases and spending according to plan. Moderate today\'s flame in favor of future abundance over immediate burning desire. Wise restraint will return as a greater reward later.',
        zh: '今天克制冲动购物，计划性消费。为了未来的丰盛，调节今天的欲望之火，而非满足当下的冲动。明智的克制以后会以更大的回报回来。',
        ja: '衝動買いを自制して計画的に支出する日です。今すぐ燃え上がる欲求より未来の豊かさのために今日の炎を調節してみてください。賢明な節制が後でより大きな報酬として戻ってきます。',
        es: 'Hoy es para contener las compras impulsivas y gastar según el plan. Modera la llama de hoy a favor de la abundancia futura sobre el deseo ardiente inmediato. La moderación sabia regresará como una mayor recompensa después.',
      },
      {
        ko: '작은 금액부터 저축을 시작하는 것이 큰 불꽃의 첫 불씨가 됩니다. 재정적 풍요는 갑자기 찾아오지 않고, 오늘의 작은 불씨들이 모여 만들어집니다. 지금 당장 가능한 것부터 시작하세요.',
        en: 'Starting to save from small amounts is the first spark of a great financial flame. Financial abundance does not arrive suddenly—it is built from today\'s small sparks gathering together. Start from what is possible right now.',
        zh: '从小额开始储蓄是大火焰的第一颗火星。财务丰盛不会突然到来，而是由今天的小火花积累而成。从现在可以做的事情开始。',
        ja: '小額から貯蓄を始めることが大きな炎の最初の火種となります。財政的な豊かさは突然訪れるものではなく、今日の小さな火種が集まって作られます。今すぐ可能なことから始めてください。',
        es: 'Empezar a ahorrar desde pequeñas cantidades es la primera chispa de una gran llama financiera. La abundancia financiera no llega de repente—se construye a partir de las pequeñas chispas de hoy reuniéndose. Empieza desde lo que es posible ahora mismo.',
      },
    ],
    low: [
      {
        ko: '위험한 투자는 오늘 피하는 것이 현명합니다. 불꽃처럼 뜨거운 충동이 있겠지만, 지금은 그 열기를 식히고 손실의 가능성을 냉정하게 바라봐야 할 때입니다. 오늘의 신중함이 내일의 기회를 지켜줍니다.',
        en: 'Avoiding risky investments today is the wise choice. There may be flame-like burning impulses, but now is the time to cool that heat and look at the possibility of loss with clear eyes. Today\'s caution protects tomorrow\'s opportunities.',
        zh: '今天避免风险投资是明智的。可能有火焰般炽热的冲动，但现在是冷却那份热情，冷静审视亏损可能性的时候。今天的谨慎保护明天的机会。',
        ja: 'リスクの高い投資は今日避けることが賢明です。炎のように熱い衝動があるでしょうが、今はその熱さを冷まして損失の可能性を冷静に見つめる時です。今日の慎重さが明日の機会を守ってくれます。',
        es: 'Evitar inversiones arriesgadas hoy es la elección sabia. Puede haber impulsos ardientes como llamas, pero ahora es el momento de enfriar ese calor y mirar con claridad la posibilidad de pérdida. La cautela de hoy protege las oportunidades de mañana.',
      },
      {
        ko: '재정 상황을 점검하고 불필요한 지출을 줄여야 하는 날입니다. 재정적 불꽃이 약해졌을 때는 새로운 연료를 더하기보다 현재 가진 것을 잘 관리하는 것이 더 현명합니다. 오늘의 절약이 내일의 안정을 만듭니다.',
        en: 'Today is the day to review your financial situation and reduce unnecessary expenses. When the financial flame weakens, managing what you already have is wiser than adding new fuel. Today\'s saving creates tomorrow\'s stability.',
        zh: '今天要检查财务状况，减少不必要的支出。当财务之火减弱时，管理好现有的比添加新燃料更明智。今天的节俭创造明天的稳定。',
        ja: '財政状況を点検し、不必要な支出を減らすべき日です。財政的な炎が弱まった時は、新しい燃料を加えるよりも現在持っているものをうまく管理する方が賢明です。今日の節約が明日の安定を作り出します。',
        es: 'Hoy es el día para revisar tu situación financiera y reducir gastos innecesarios. Cuando la llama financiera se debilita, gestionar lo que ya tienes es más sabio que agregar nuevo combustible. El ahorro de hoy crea la estabilidad de mañana.',
      },
      {
        ko: '큰 금액의 거래나 계약은 오늘 미루는 것이 좋겠습니다. 불꽃이 약한 날에 큰 결정을 내리면 나중에 후회할 가능성이 높습니다. 잠시 기다리면 더 유리한 조건과 더 맑은 판단이 함께 찾아올 것입니다.',
        en: 'It is better to postpone large transactions or contracts today. Making big decisions on a day when the flame is low greatly increases the chance of regret later. Wait a little—more favorable conditions and clearer judgment will arrive together.',
        zh: '今天最好推迟大额交易或合同。在火焰微弱的日子做重大决定，以后后悔的可能性很高。稍等一下，更有利的条件和更清晰的判断会一起到来。',
        ja: '大きな金額の取引や契約は今日延期した方が良いでしょう。炎が弱い日に大きな決断を下すと、後で後悔する可能性が高くなります。少し待てば、より有利な条件とより明晰な判断が一緒に訪れるでしょう。',
        es: 'Es mejor posponer transacciones o contratos grandes hoy. Tomar grandes decisiones en un día en que la llama está baja aumenta enormemente la posibilidad de arrepentimiento posterior. Espera un poco—condiciones más favorables y un juicio más claro llegarán juntos.',
      },
    ],
  },
};

// Earth (흙) - 황소자리, 처녀자리, 염소자리
const earthTemplates: ElementTemplates = {
  overall: {
    high: [
      {
        ko: '안정적인 기반 위에서 쌓아온 노력이 오늘 드디어 눈에 보이는 성과로 이어집니다. 꾸준함은 화려하지 않지만, 이처럼 단단하고 오래가는 결실을 만들어냅니다. 오늘의 성과를 자랑스럽게 여기고, 그 기반 위에서 다음 단계를 준비하세요.',
        en: 'The effort you have steadily built on a solid foundation finally translates into visible results today. Consistency is not glamorous, but it creates achievements this solid and lasting. Be proud of today\'s results and use that foundation to prepare for the next step.',
        zh: '在稳定基础上积累的努力今天终于转化为看得见的成果。稳定性并不耀眼，但能创造如此坚实持久的成果。为今天的成果感到自豪，并在这个基础上准备下一步。',
        ja: '安定した基盤の上に積み重ねてきた努力が今日ついに目に見える成果につながります。着実さは華やかではありませんが、こんなにも確かで長続きする結実を作り出します。今日の成果を誇りに思い、その基盤の上で次のステップを準備してください。',
        es: 'El esfuerzo que has acumulado sobre una base sólida finalmente se traduce en resultados visibles hoy. La consistencia no es glamorosa, pero crea logros tan sólidos y duraderos. Siéntete orgulloso de los resultados de hoy y usa esa base para preparar el siguiente paso.',
      },
      {
        ko: '실용적인 접근이 오늘 가장 빛을 발하는 날입니다. 현실에 발을 딛고 계획대로 차근차근 나아가는 당신의 방식이 최고의 결과를 만들어냅니다. 화려한 도약보다 단단한 한 걸음이 오늘의 승리입니다.',
        en: 'Your practical approach shines brightest today. Your way of staying grounded in reality and advancing step by step according to plan produces the best results. One solid step beats any flashy leap—today that steady step is your victory.',
        zh: '今天务实的方法最为耀眼。你脚踏实地、按计划一步一步前进的方式创造最好的结果。比起华丽的飞跃，坚实的一步才是今天的胜利。',
        ja: '実用的なアプローチが今日最も輝きを放つ日です。現実に足をつけて計画通りに一歩一歩進むあなたのやり方が最高の結果を生み出します。華やかな飛躍よりも確かな一歩が今日の勝利です。',
        es: 'Tu enfoque práctico brilla más hoy. Tu forma de mantenerte arraigado en la realidad y avanzar paso a paso según el plan produce los mejores resultados. Un paso sólido supera cualquier salto llamativo—hoy ese paso constante es tu victoria.',
      },
      {
        ko: '인내와 성실함이 드디어 보상받는 시기입니다. 남들이 빠른 길을 찾을 때 당신은 올바른 길을 걸어왔고, 그 차이가 오늘 명확하게 드러납니다. 이 결실을 온전히 누리세요—당신이 충분히 받을 자격이 있습니다.',
        en: 'This is the time when patience and diligence are finally rewarded. While others sought shortcuts, you walked the right path, and that difference becomes clearly visible today. Enjoy this harvest fully—you have earned every bit of it.',
        zh: '这是耐心和勤奋终于得到回报的时期。当别人寻找捷径时，你走的是正确的路，今天这种差异清晰地显现出来。充分享受这份成果——你完全值得拥有。',
        ja: '忍耐と誠実さがついに報われる時期です。他の人が近道を探す時、あなたは正しい道を歩んできて、その差が今日明確に現れます。この結実を存分に楽しんでください—あなたはそれを受け取るに十分値します。',
        es: 'Este es el momento en que la paciencia y la diligencia finalmente son recompensadas. Mientras otros buscaban atajos, tú caminaste por el camino correcto, y esa diferencia se vuelve claramente visible hoy. Disfruta completamente esta cosecha—te la has ganado plenamente.',
      },
    ],
    medium: [
      {
        ko: '일상의 루틴을 잘 유지하는 것이 오늘의 가장 강력한 전략입니다. 흙이 씨앗을 품듯, 당신의 꾸준한 일상 속에 성장의 씨앗이 조용히 자라고 있습니다. 오늘도 어제처럼 해내는 것이 가장 현명한 선택입니다.',
        en: 'Maintaining your daily routine well is the most powerful strategy today. Just as soil holds seeds, within your steady daily life, seeds of growth are quietly developing. Doing today just as you did yesterday is the wisest choice.',
        zh: '保持日常规律是今天最有力的策略。就像土壤孕育种子，在你稳定的日常生活中，成长的种子正在悄悄生长。今天像昨天一样坚持是最明智的选择。',
        ja: '日常のルーティンをうまく維持することが今日の最も強力な戦略です。土が種を抱くように、あなたの着実な日常の中に成長の種が静かに育っています。今日も昨日のようにやり遂げることが最も賢明な選択です。',
        es: 'Mantener bien tu rutina diaria es la estrategia más poderosa hoy. Al igual que el suelo sostiene las semillas, dentro de tu vida diaria constante, las semillas del crecimiento se están desarrollando silenciosamente. Hacer hoy igual que ayer es la elección más sabia.',
      },
      {
        ko: '급격한 변화보다 점진적인 개선에 집중하는 것이 당신의 강점입니다. 작은 변화들이 모여 큰 변혁이 되는 것처럼, 오늘의 작은 개선이 내일의 큰 성과를 만듭니다. 한 번에 하나씩, 천천히 그러나 확실하게 나아가세요.',
        en: 'Focusing on gradual improvement rather than drastic change is your true strength. Just as small changes accumulate into major transformation, today\'s small improvement creates tomorrow\'s large achievement. One thing at a time, slowly but surely.',
        zh: '专注于渐进改善而非剧烈变化是你的优势。就像小变化积累成大变革，今天的小改进创造明天的大成果。一次一件，慢慢但确实地前进。',
        ja: '急激な変化より段階的な改善に集中することがあなたの強みです。小さな変化が積み重なって大きな変革になるように、今日の小さな改善が明日の大きな成果を作り出します。一度に一つずつ、ゆっくりでも確実に進んでください。',
        es: 'Enfocarte en la mejora gradual en lugar del cambio drástico es tu verdadera fortaleza. Al igual que los pequeños cambios se acumulan en una gran transformación, la pequeña mejora de hoy crea el gran logro de mañana. Una cosa a la vez, lento pero seguro.',
      },
      {
        ko: '현실적인 목표 설정이 오늘의 나침반입니다. 하늘에 닿을 것 같은 목표보다 땅에 발을 붙인 계획이 실제 성과를 만들어냅니다. 오늘 달성 가능한 것 한 가지를 정하고 그것을 완전히 이루어내세요.',
        en: 'Setting realistic goals is your compass today. Plans firmly grounded in the earth produce real results more than goals that seem to touch the sky. Choose one achievable thing today and complete it fully.',
        zh: '今天设定现实目标是你的指南针。脚踏实地的计划比看似触及天空的目标更能创造实际成果。今天定下一件可实现的事，彻底完成它。',
        ja: '現実的な目標設定が今日の羅針盤です。空に届くような目標よりも大地に足をつけた計画が実際の成果を作り出します。今日達成可能なことを一つ定めて、それを完全にやり遂げてください。',
        es: 'Establecer metas realistas es tu brújula hoy. Los planes firmemente arraigados en la tierra producen resultados reales más que las metas que parecen tocar el cielo. Elige una cosa alcanzable hoy y complétala por completo.',
      },
    ],
    low: [
      {
        ko: '변화에 저항하는 것이 오히려 더 큰 어려움을 만들 수 있는 날입니다. 흙도 때로는 물을 받아들여야 씨앗이 자라듯, 오늘은 새로운 것을 조금 받아들이는 유연함이 필요합니다. 변화를 두려워하지 않아도 됩니다—그것도 성장의 일부입니다.',
        en: 'Resisting change can create greater difficulties today. Just as soil must absorb water for seeds to grow, a little flexibility in accepting new things is needed today. You do not have to fear change—it too is part of growth.',
        zh: '今天抵制变化反而可能造成更大的困难。就像土壤需要吸收水分种子才能生长，今天需要一点接受新事物的灵活性。不必害怕变化——它也是成长的一部分。',
        ja: '変化に抵抗することがかえってより大きな困難を作る可能性がある日です。土も時に水を受け入れなければ種が育たないように、今日は新しいものを少し受け入れる柔軟さが必要です。変化を怖れなくて大丈夫です—それも成長の一部です。',
        es: 'Resistir el cambio puede crear mayores dificultades hoy. Al igual que el suelo debe absorber agua para que las semillas crezcan, hoy se necesita un poco de flexibilidad para aceptar cosas nuevas. No tienes que temer el cambio—también es parte del crecimiento.',
      },
      {
        ko: '고집을 부리면 손해를 볼 수 있는 시기입니다. 당신의 방식이 옳더라도, 오늘은 타협의 여지를 남겨두는 것이 더 큰 것을 얻는 방법입니다. 유연함은 당신의 기반을 무너뜨리는 것이 아니라 그것을 더 넓히는 것입니다.',
        en: 'Stubbornness can cause losses during this period. Even if your way is correct, leaving room for compromise today is how you gain more. Flexibility does not undermine your foundation—it expands it.',
        zh: '这个时期固执可能会吃亏。即使你的方式是正确的，今天留出妥协的余地是获得更多的方法。灵活性不会瓦解你的基础，而是扩展它。',
        ja: '頑固になると損をする可能性がある時期です。あなたのやり方が正しくても、今日は妥協の余地を残しておくことがより大きなものを得る方法です。柔軟さはあなたの基盤を崩すものではなく、それを広げるものです。',
        es: 'La terquedad puede causar pérdidas durante este período. Incluso si tu camino es correcto, dejar espacio para el compromiso hoy es como obtienes más. La flexibilidad no socava tu base—la expande.',
      },
      {
        ko: '완벽을 추구하다 정작 중요한 기회를 놓칠 수 있습니다. 흙이 완전히 굳기를 기다리다 씨앗을 심을 시기를 놓치듯, 오늘은 충분히 좋은 것으로 만족하고 앞으로 나아가세요. 적당한 만족이 때로는 가장 현명한 완성입니다.',
        en: 'Pursuing perfection may cause you to miss the most important opportunities. Just as waiting for soil to harden completely can miss the planting season, today settle for good enough and move forward. Moderate satisfaction is sometimes the wisest completion.',
        zh: '追求完美可能错失真正重要的机会。就像等待土壤完全变硬而错过播种时机，今天满足于足够好并向前迈进。适度的满足有时是最明智的完成。',
        ja: '完璧を追求して肝心な機会を逃す可能性があります。土が完全に固まるのを待って種を植える時期を逃すように、今日は十分に良いものに満足して前に進んでください。適度な満足が時には最も賢明な完成です。',
        es: 'Perseguir la perfección puede hacer que pierdas las oportunidades más importantes. Al igual que esperar a que el suelo se endurezca por completo puede perderse la temporada de siembra, hoy conténtate con lo suficientemente bueno y avanza. La satisfacción moderada es a veces la culminación más sabia.',
      },
    ],
  },
  love: {
    high: [
      {
        ko: '안정적이고 신뢰할 수 있는 사랑이 오늘 더욱 깊어집니다. 당신의 진실된 마음과 한결같은 태도가 상대방의 마음에 깊이 뿌리내리고 있습니다. 이 사랑은 화려하지 않지만 그 어떤 것보다 단단하고 오래갑니다.',
        en: 'Stable and trustworthy love deepens even further today. Your sincere heart and consistent attitude are taking deep root in your partner\'s heart. This love is not flashy, but it is more solid and lasting than anything else.',
        zh: '今天稳定可靠的爱情进一步加深。你真诚的心和一贯的态度在对方心中深深扎根。这份爱不华丽，但比任何东西都坚实持久。',
        ja: '安定して信頼できる愛が今日さらに深まります。あなたの真実の心と一貫した態度が相手の心に深く根ざしています。この愛は華やかではありませんが、何よりも確かで長続きします。',
        es: 'El amor estable y confiable se profundiza aún más hoy. Tu corazón sincero y tu actitud constante están echando raíces profundas en el corazón de tu pareja. Este amor no es llamativo, pero es más sólido y duradero que cualquier otra cosa.',
      },
      {
        ko: '진실된 마음이 상대방에게 온전히 전해지는 날입니다. 당신이 그동안 쌓아온 성실함과 배려가 오늘 상대방의 마음을 움직입니다. 말이 아닌 행동으로 보여온 사랑의 힘이 가장 강합니다.',
        en: 'Your true heart reaches your partner fully today. The sincerity and consideration you have built up over time moves their heart today. Love shown through actions rather than words carries the greatest power.',
        zh: '今天真诚的心意完全传达给对方。你积累的诚意和关怀今天感动了对方的心。用行动而非言语展示的爱力量最大。',
        ja: '真実の心が相手に完全に伝わる日です。あなたがこれまで積み重ねてきた誠実さと思いやりが今日、相手の心を動かします。言葉ではなく行動で示してきた愛の力が最も強いのです。',
        es: 'Tu verdadero corazón llega plenamente a tu pareja hoy. La sinceridad y consideración que has acumulado a lo largo del tiempo mueve su corazón hoy. El amor mostrado a través de acciones en lugar de palabras lleva el mayor poder.',
      },
      {
        ko: '오래 지속될 관계의 기반을 오늘 더욱 단단하게 다질 수 있습니다. 사랑은 순간의 열정만이 아니라 긴 시간을 함께 버텨내는 힘에서 완성됩니다. 오늘 당신이 만들어가는 이 기반이 두 사람의 미래를 지탱할 것입니다.',
        en: 'You can solidify even further today the foundation for a long-lasting relationship. Love is completed not just by passion in the moment but by the strength to endure long time together. The foundation you are building today will support both of your futures.',
        zh: '今天你可以进一步巩固长久关系的基础。爱情不仅仅由当下的热情完成，还需要长时间共同坚持的力量。你今天建立的基础将支撑两个人的未来。',
        ja: '長く続く関係の基盤を今日さらに固めることができます。愛は瞬間の情熱だけでなく、長い時間を共に耐えていく力の中で完成します。今日あなたが築いているこの基盤が、二人の未来を支えていくでしょう。',
        es: 'Hoy puedes consolidar aún más los cimientos de una relación duradera. El amor se completa no solo por la pasión del momento sino por la fuerza para perdurar mucho tiempo juntos. La base que estás construyendo hoy sostendrá el futuro de ambos.',
      },
    ],
    medium: [
      {
        ko: '서로에 대한 신뢰를 한 층 더 쌓아가는 시기입니다. 거창한 사랑의 표현보다 일상 속 작은 약속을 지키는 것이 오늘 관계를 더 깊게 만들어줍니다. 오늘 한 가지 작은 배려를 실천해보세요.',
        en: 'This is a period for building another layer of trust in each other. Keeping small promises in daily life deepens the relationship more today than grand expressions of love. Practice one small act of care today.',
        zh: '这是进一步建立相互信任的时期。保持日常中的小承诺比宏大的爱情表达更能加深今天的关系。今天实践一个小小的关怀行动。',
        ja: 'お互いへの信頼をもう一段積み重ねていく時期です。大げさな愛の表現よりも日常の中の小さな約束を守ることが、今日関係をより深くしてくれます。今日一つの小さな思いやりを実践してみてください。',
        es: 'Este es un período para construir otra capa de confianza mutua. Cumplir pequeñas promesas en la vida diaria profundiza la relación hoy más que las grandes expresiones de amor. Practica un pequeño acto de cuidado hoy.',
      },
      {
        ko: '일상 속 작은 배려가 사랑을 천천히 꽃피웁니다. 흙에서 꽃이 자라듯, 매일의 세심한 관심이 쌓여 아름다운 관계가 됩니다. 오늘 상대방이 필요로 하는 작은 것 하나에 주목해보세요.',
        en: 'Small considerations in daily life slowly bloom into love. Just as flowers grow from soil, daily attentive care accumulates into a beautiful relationship. Today notice one small thing your partner needs.',
        zh: '日常中的小关怀慢慢让爱情盛开。就像花从土壤中生长，每天细心的关注积累成美好的关系。今天注意对方需要的一件小事。',
        ja: '日常の中の小さな思いやりが愛をゆっくりと開花させます。土から花が育つように、毎日の細やかな関心が積み重なって美しい関係となります。今日、相手が必要としている小さなことに一つ注目してみてください。',
        es: 'Las pequeñas consideraciones en la vida diaria florecen lentamente en amor. Al igual que las flores crecen del suelo, la atención diaria se acumula en una relación hermosa. Hoy nota una pequeña cosa que tu pareja necesita.',
      },
      {
        ko: '관계를 급하게 발전시키려는 마음을 내려놓으세요. 가장 단단한 사랑은 천천히, 자연스럽게 뿌리를 내립니다. 지금 이 속도 그대로가 두 사람의 사랑에 가장 알맞은 리듬입니다.',
        en: 'Let go of the desire to rush the relationship forward. The most solid love takes root slowly and naturally. The current pace is exactly the right rhythm for both of your love.',
        zh: '放下急于推进关系的心。最坚实的爱慢慢地、自然地扎根。现在这个速度就是两个人爱情最合适的节奏。',
        ja: '関係を急いで発展させようとする気持ちを手放してください。最も確かな愛はゆっくりと自然に根を張ります。今のこのペースそのものが、二人の愛に最も適したリズムです。',
        es: 'Suelta el deseo de apresurarte en la relación. El amor más sólido echa raíces lenta y naturalmente. El ritmo actual es exactamente el ritmo adecuado para el amor de ambos.',
      },
    ],
    low: [
      {
        ko: '소유욕이나 집착이 관계를 옥죌 수 있는 날입니다. 흙이 너무 단단하게 굳어버리면 뿌리가 자라지 못하듯, 상대방에게 충분한 공간을 주는 것이 오히려 사랑을 더 깊이 뿌리내리게 합니다. 오늘은 잡지 않는 것이 가장 강한 사랑입니다.',
        en: 'Possessiveness or obsession may be constraining the relationship today. Just as roots cannot grow when soil hardens too much, giving your partner sufficient space actually allows love to take deeper root. Today, not grasping is the strongest form of love.',
        zh: '今天占有欲或执着可能束缚关系。就像土壤过硬根无法生长，给对方足够的空间反而让爱情更深扎根。今天，不抓紧是最强大的爱。',
        ja: '所有欲や執着が関係を締め付ける可能性がある日です。土が固くなりすぎると根が育てないように、相手に十分な空間を与えることがかえって愛をより深く根ざさせます。今日は掴まないことが最も強い愛です。',
        es: 'La posesividad u obsesión puede estar restringiendo la relación hoy. Al igual que las raíces no pueden crecer cuando el suelo se endurece demasiado, dar a tu pareja suficiente espacio en realidad permite que el amor eche raíces más profundas. Hoy, no aferrarse es la forma más fuerte de amor.',
      },
      {
        ko: '고집으로 인한 갈등이 생길 수 있는 시기입니다. 당신의 방식이 옳다고 느껴지더라도, 오늘은 한 발 물러서서 상대방의 관점을 받아들여보세요. 유연하게 대처하는 것이 관계를 더 단단하게 만듭니다.',
        en: 'Conflicts due to stubbornness may arise during this period. Even if your way feels right, today try stepping back and accepting your partner\'s perspective. Dealing with flexibility makes the relationship more solid.',
        zh: '这个时期可能因固执产生冲突。即使你觉得自己的方式是对的，今天也试着退一步，接受对方的观点。灵活应对使关系更加坚固。',
        ja: '頑固さによる衝突が起きる可能性がある時期です。あなたのやり方が正しいと感じても、今日は一歩引いて相手の視点を受け入れてみてください。柔軟に対処することが関係をより強固にします。',
        es: 'Pueden surgir conflictos por terquedad durante este período. Incluso si tu camino se siente correcto, hoy intenta dar un paso atrás y aceptar la perspectiva de tu pareja. Manejar con flexibilidad hace la relación más sólida.',
      },
      {
        ko: '현실적인 기대를 가지는 것이 오늘 관계를 지키는 방법입니다. 이상과 현실의 차이를 있는 그대로 받아들이면, 오히려 그 안에서 진정한 사랑의 아름다움을 발견할 수 있습니다. 완벽한 사랑보다 진실한 사랑이 더 소중합니다.',
        en: 'Having realistic expectations is how you protect the relationship today. Accepting the gap between ideal and reality as it is actually allows you to discover true beauty in love within that space. Genuine love is more precious than perfect love.',
        zh: '今天保持现实的期望是维护关系的方法。如实接受理想与现实的差距，反而能在其中发现真爱的美。真实的爱比完美的爱更珍贵。',
        ja: '現実的な期待を持つことが今日、関係を守る方法です。理想と現実のギャップをあるがままに受け入れることで、かえってその中に本当の愛の美しさを見つけることができます。完璧な愛よりも真実の愛の方がより大切です。',
        es: 'Tener expectativas realistas es cómo proteges la relación hoy. Aceptar la brecha entre lo ideal y la realidad tal como es te permite descubrir la verdadera belleza del amor en ese espacio. El amor genuino es más precioso que el amor perfecto.',
      },
    ],
  },
  career: {
    high: [
      {
        ko: '꾸준한 노력이 드디어 결실을 맺는 날입니다. 오랫동안 묵묵히 쌓아온 실력과 성실함이 오늘 주변 사람들에게 분명히 보입니다. 이 성과를 당당하게 인정하고, 더 큰 목표를 향한 발판으로 삼으세요.',
        en: 'Steady effort finally bears fruit today. The skill and diligence you have quietly built over a long time is clearly visible to those around you today. Acknowledge this achievement confidently and use it as a stepping stone toward greater goals.',
        zh: '稳定的努力今天终于结出果实。你长期默默积累的实力和诚信今天清晰地展现在周围人面前。自豪地承认这一成果，并将其作为迈向更大目标的踏脚石。',
        ja: '着実な努力がついに実を結ぶ日です。長い間黙々と積み重ねてきた実力と誠実さが今日、周りの人々に明確に見えます。この成果を堂々と認め、より大きな目標に向けた足がかりにしてください。',
        es: 'El esfuerzo constante finalmente da frutos hoy. La habilidad y diligencia que has construido silenciosamente durante mucho tiempo es claramente visible para quienes te rodean hoy. Reconoce este logro con confianza y úsalo como trampolín hacia metas mayores.',
      },
      {
        ko: '실무 능력이 인정받는 시기입니다. 화려한 말보다 실제 결과물이 당신의 가치를 증명하는 날로, 전문성을 자신 있게 발휘하세요. 지금까지 해온 것들이 모두 이 순간을 위해 준비되어 있었습니다.',
        en: 'This is the time when practical skills are recognized. Your actual results prove your value more than eloquent words today, so exercise your expertise with confidence. Everything you have done until now was preparation for this moment.',
        zh: '这是实务能力得到认可的时期。今天实际成果比华丽的言辞更能证明你的价值，自信地发挥你的专业性。你迄今为止所做的一切都是为这一刻准备的。',
        ja: '実務能力が認められる時期です。今日は華やかな言葉より実際の成果があなたの価値を証明する日で、専門性を自信を持って発揮してください。これまでやってきたことはすべてこの瞬間のために準備されていたのです。',
        es: 'Este es el momento en que las habilidades prácticas son reconocidas. Tus resultados reales demuestran tu valor más que las palabras elocuentes hoy, así que ejerce tu experiencia con confianza. Todo lo que has hecho hasta ahora fue preparación para este momento.',
      },
      {
        ko: '장기 프로젝트에서 좋은 진전이 있는 날입니다. 인내를 가지고 지속해온 일들이 이제 눈에 보이는 형태로 드러나고 있습니다. 흙 속에서 싹이 트듯, 당신의 노력이 세상에 모습을 드러내고 있습니다.',
        en: 'There is good progress in long-term projects today. The work you have continued with patience is now appearing in visible form. Just as a sprout breaks through soil, your effort is showing itself to the world.',
        zh: '今天长期项目有良好进展。你耐心坚持的工作现在以看得见的形式显现出来。就像幼苗破土而出，你的努力正在向世界展现自己。',
        ja: '長期的なプロジェクトで良い進展がある日です。忍耐を持って続けてきた仕事が今、目に見える形で現れてきています。土の中から芽が出るように、あなたの努力が世界に姿を現しています。',
        es: 'Hay buen progreso en proyectos a largo plazo hoy. El trabajo que has continuado con paciencia ahora está apareciendo en forma visible. Al igual que un brote atraviesa el suelo, tu esfuerzo se está mostrando al mundo.',
      },
    ],
    medium: [
      {
        ko: '맡은 일을 묵묵히 처리하는 것이 오늘 가장 강력한 전략입니다. 화려한 성과를 내기 위한 무리한 시도보다, 기본에 충실한 꾸준함이 장기적으로 훨씬 강한 인상을 남깁니다. 오늘도 묵묵히 당신의 자리를 지키세요.',
        en: 'Quietly handling your assigned tasks is the most powerful strategy today. Steady faithfulness to the basics leaves a far stronger long-term impression than forced attempts at flashy results. Keep holding your ground quietly today as well.',
        zh: '默默处理好交付的工作是今天最有力的策略。比起为了华丽成绩而勉强尝试，忠于基础的稳定性从长远来看留下更深刻的印象。今天也默默坚守你的岗位。',
        ja: '任された仕事を黙々とこなすことが今日の最も強力な戦略です。派手な成果を出すための無理な試みより、基本に忠実な着実さが長期的にはるかに強い印象を残します。今日も黙々とあなたの場所を守ってください。',
        es: 'Manejar silenciosamente las tareas asignadas es la estrategia más poderosa hoy. La constancia fiel a los fundamentos deja una impresión a largo plazo mucho más fuerte que los intentos forzados de resultados llamativos. Mantén tu posición en silencio hoy también.',
      },
      {
        ko: '기본에 충실한 날이 가장 단단한 성과를 만드는 날입니다. 화려함보다 내실이 중요하다는 것을 오늘 다시 한 번 확인하게 됩니다. 당신의 강점은 빠름이 아니라 정확함과 꾸준함에 있습니다.',
        en: 'The day faithful to the basics is the day that creates the most solid results. Today you will be reminded once more that substance is more important than flash. Your strength lies not in speed but in precision and consistency.',
        zh: '忠于基础的日子是创造最坚实成果的日子。今天你再次确认实质比华丽更重要。你的优势不在于速度，而在于精确性和稳定性。',
        ja: '基本に忠実な日が最も確かな成果を作る日です。今日、華やかさよりも中身が重要だということを改めて確認することになります。あなたの強みは速さではなく、正確さと着実さにあります。',
        es: 'El día fiel a los fundamentos es el día que crea los resultados más sólidos. Hoy te recordarás una vez más que la sustancia es más importante que el brillo. Tu fortaleza no está en la velocidad sino en la precisión y consistencia.',
      },
      {
        ko: '체계적인 업무 관리가 효율을 높이는 날입니다. 오늘 해야 할 일의 목록을 만들고, 가장 중요한 것부터 차근차근 처리해보세요. 흙이 씨앗마다 맞는 깊이가 있듯, 각 업무에 맞는 집중도를 배분하면 훨씬 좋은 결과가 나옵니다.',
        en: 'Systematic work management increases efficiency today. Create a list of what needs to be done and handle the most important things first in order. Just as each seed has the right depth in soil, allocating the appropriate level of focus to each task produces much better results.',
        zh: '今天系统的工作管理提高效率。列出今天要做的事情清单，从最重要的开始依次处理。就像土壤中每粒种子有合适的深度，为每项任务分配合适的专注度会产生更好的结果。',
        ja: '体系的な業務管理が効率を高める日です。今日やるべきことのリストを作り、最も重要なことから順番に処理してみてください。土が種ごとに適した深さがあるように、各業務に適した集中度を配分するとずっと良い結果が出ます。',
        es: 'La gestión sistemática del trabajo aumenta la eficiencia hoy. Crea una lista de lo que debe hacerse y maneja las cosas más importantes primero en orden. Al igual que cada semilla tiene la profundidad adecuada en el suelo, asignar el nivel apropiado de enfoque a cada tarea produce resultados mucho mejores.',
      },
    ],
    low: [
      {
        ko: '변화에 적응하는 것이 어렵게 느껴지는 날이지만, 흙도 새로운 비를 맞아야 더 비옥해집니다. 열린 마음으로 새로운 방식을 받아들이는 것이 오늘 당신의 가장 큰 성장 기회입니다. 모든 변화가 위협은 아닙니다.',
        en: 'Adapting to change may feel difficult today, but soil must receive new rain to become more fertile. Accepting new methods with an open mind is your greatest growth opportunity today. Not every change is a threat.',
        zh: '今天适应变化可能感觉困难，但土壤需要接受新的雨水才能更肥沃。以开放的心态接受新方法是今天你最大的成长机会。并非所有变化都是威胁。',
        ja: '変化に適応することが難しく感じられる日ですが、土も新しい雨を受けてこそより肥沃になります。開かれた心で新しい方法を受け入れることが今日のあなたの最大の成長機会です。すべての変化が脅威ではありません。',
        es: 'Adaptarse al cambio puede sentirse difícil hoy, pero el suelo debe recibir nueva lluvia para volverse más fértil. Aceptar nuevos métodos con una mente abierta es tu mayor oportunidad de crecimiento hoy. No todo cambio es una amenaza.',
      },
      {
        ko: '완벽주의가 업무 진행을 늦출 수 있는 시기입니다. 씨앗을 심기 전에 완벽한 흙을 기다리다 보면 영영 심지 못할 수도 있습니다. 오늘은 우선순위를 정하고 충분히 준비된 것부터 실행에 옮기세요.',
        en: 'Perfectionism may slow work progress during this period. Waiting for perfect soil before planting seeds may mean never planting at all. Today, set priorities and start executing the things that are sufficiently prepared.',
        zh: '这个时期完美主义可能拖慢工作进度。等待完美土壤才播种可能意味着永远无法播种。今天，设定优先级，从已经充分准备好的事情开始执行。',
        ja: '完璧主義が業務の進行を遅らせる可能性がある時期です。完璧な土を待ってから種を植えようとすると、永遠に植えられない可能性があります。今日は優先順位を決め、十分に準備できたものから実行に移してください。',
        es: 'El perfeccionismo puede ralentizar el progreso del trabajo durante este período. Esperar suelo perfecto antes de plantar semillas puede significar no plantar nunca. Hoy, establece prioridades y comienza a ejecutar las cosas que están suficientemente preparadas.',
      },
      {
        ko: '새로운 방식을 시도하는 것을 두려워하지 않아도 됩니다. 흙은 다양한 씨앗을 품을 수 있는 능력이 있듯, 당신도 생각보다 훨씬 더 많은 것을 받아들일 수 있는 내면의 유연함을 가지고 있습니다. 오늘은 그 유연함을 믿어보세요.',
        en: 'You do not have to be afraid of trying new methods. Just as soil has the capacity to hold many different seeds, you too have an inner flexibility to absorb far more than you think. Today, trust in that flexibility.',
        zh: '不必害怕尝试新方法。就像土壤有能力孕育各种种子，你也拥有比你想象的更能接受事物的内在灵活性。今天，相信那份灵活性。',
        ja: '新しい方法を試すことを恐れなくて大丈夫です。土が様々な種を抱える能力があるように、あなたも思っているよりずっと多くのことを受け入れられる内なる柔軟さを持っています。今日はその柔軟さを信じてみてください。',
        es: 'No tienes que tener miedo de probar nuevos métodos. Al igual que el suelo tiene la capacidad de sostener muchas semillas diferentes, tú también tienes una flexibilidad interior para absorber mucho más de lo que piensas. Hoy, confía en esa flexibilidad.',
      },
    ],
  },
  health: {
    high: [
      {
        ko: '건강의 기반이 매우 튼튼한 시기입니다. 꾸준히 쌓아온 좋은 생활 습관이 오늘 당신의 몸에서 활력으로 나타나고 있습니다. 이 좋은 흐름을 유지하고, 오늘의 건강함이 더 오래 지속될 수 있도록 관리하세요.',
        en: 'The foundation of your health is very solid during this period. The good lifestyle habits you have consistently built are appearing today as vitality in your body. Maintain this good flow and manage it so today\'s healthiness can last even longer.',
        zh: '这个时期健康基础非常坚实。你一贯保持的良好生活习惯今天在你的身体中表现为活力。保持这股好势头，管理好让今天的健康能持续更长时间。',
        ja: '健康の基盤がとても丈夫な時期です。着実に積み重ねてきた良い生活習慣が今日、あなたの体に活力として現れています。この良い流れを維持し、今日の健康さがより長く続くように管理してください。',
        es: 'La base de tu salud es muy sólida durante este período. Los buenos hábitos de vida que has construido consistentemente están apareciendo hoy como vitalidad en tu cuerpo. Mantén este buen flujo y manéjalo para que la salud de hoy pueda durar aún más.',
      },
      {
        ko: '규칙적인 생활이 활력을 가져오는 날입니다. 일정한 시간에 자고 일어나며, 규칙적인 식사를 하는 것이 당신의 에너지를 안정적으로 유지시켜 줍니다. 오늘의 규칙성이 내일의 활력을 만드는 씨앗입니다.',
        en: 'A regular lifestyle brings vitality today. Going to sleep and waking at consistent times and eating regular meals keeps your energy stable. Today\'s regularity is the seed that creates tomorrow\'s vitality.',
        zh: '今天规律的生活带来活力。按时睡觉起床，规律饮食，让你的能量保持稳定。今天的规律性是创造明天活力的种子。',
        ja: '規則正しい生活が活力をもたらす日です。一定の時間に寝て起き、規則的な食事をすることがあなたのエネルギーを安定して維持させてくれます。今日の規則正しさが明日の活力を作る種です。',
        es: 'Un estilo de vida regular trae vitalidad hoy. Dormir y despertar a horas consistentes y comer comidas regulares mantiene tu energía estable. La regularidad de hoy es la semilla que crea la vitalidad de mañana.',
      },
      {
        ko: '건강한 식습관이 오늘 몸에서 실제로 느껴지는 날입니다. 오랫동안 지켜온 식이 관리가 오늘 활력과 맑은 정신으로 보답하고 있습니다. 건강은 하루아침에 만들어지지 않으며, 당신은 그것을 가장 잘 알고 있습니다.',
        en: 'The effects of healthy eating habits are actually felt in your body today. The dietary management you have maintained for a long time is repaying you today with vitality and a clear mind. Health is not built overnight, and you know this better than anyone.',
        zh: '今天健康饮食习惯的效果在身体上实际感受到了。你长期坚持的饮食管理今天以活力和清晰的思维回报你。健康不是一天建成的，而你最了解这一点。',
        ja: '健康的な食習慣が今日、体で実際に感じられる日です。長い間続けてきた食事管理が今日、活力と澄んだ精神として報いてくれています。健康は一朝一夕には作られず、あなたはそれを一番よく知っています。',
        es: 'Los efectos de los hábitos alimenticios saludables se sienten realmente en tu cuerpo hoy. El manejo dietético que has mantenido durante mucho tiempo te está recompensando hoy con vitalidad y una mente clara. La salud no se construye de la noche a la mañana, y tú lo sabes mejor que nadie.',
      },
    ],
    medium: [
      {
        ko: '꾸준한 건강 관리를 계속하는 것이 오늘의 중요한 과제입니다. 흙이 지속적인 돌봄을 받아야 비옥함을 유지하듯, 몸도 규칙적인 관리가 있어야 건강을 유지합니다. 오늘도 빠짐없이 루틴을 지켜보세요.',
        en: 'Continuing steady health management is the important task today. Just as soil must receive continuous care to maintain its fertility, the body needs regular care to maintain health. Follow your routine without missing anything today as well.',
        zh: '今天继续稳定的健康管理是重要任务。就像土壤需要持续的照料才能保持肥沃，身体也需要定期管理才能保持健康。今天也不遗漏地坚持日常规律。',
        ja: '着実な健康管理を続けることが今日の重要な課題です。土が継続的なケアを受けてこそ肥沃さを維持するように、体も規則的な管理があってこそ健康を維持します。今日も欠かさずルーティンを守ってみてください。',
        es: 'Continuar con la gestión de salud constante es la tarea importante hoy. Al igual que el suelo debe recibir cuidados continuos para mantener su fertilidad, el cuerpo necesita cuidados regulares para mantener la salud. Sigue tu rutina sin perder nada hoy también.',
      },
      {
        ko: '무리하지 않는 범위에서 운동하는 것이 가장 현명합니다. 흙도 너무 무겁게 짓밟히면 딱딱해지듯, 몸도 과도한 운동은 오히려 해가 됩니다. 오늘은 적당한 강도로 꾸준히 움직이세요.',
        en: 'Exercising within a range that does not strain you is the wisest approach. Just as soil becomes hard when trampled too heavily, excessive exercise actually harms the body. Move steadily at moderate intensity today.',
        zh: '在不勉强的范围内运动是最明智的。就像土壤被过重踩压会变硬，过度运动实际上对身体有害。今天以适当的强度稳定地运动。',
        ja: '無理のない範囲で運動することが最も賢明です。土も重く踏み固められすぎると固くなるように、体も過度な運動はかえって害になります。今日は適度な強度で着実に動いてください。',
        es: 'Hacer ejercicio dentro de un rango que no te esfuerce es el enfoque más sabio. Al igual que el suelo se endurece cuando se pisa demasiado, el ejercicio excesivo en realidad daña el cuerpo. Muévete de manera constante a intensidad moderada hoy.',
      },
      {
        ko: '영양 균형에 신경 쓰는 것이 오늘 특히 중요합니다. 흙이 다양한 미네랄을 필요로 하듯, 당신의 몸도 편식 없는 균형 잡힌 영양이 필요합니다. 오늘 한 가지 영양 있는 음식을 의식적으로 선택해보세요.',
        en: 'Paying attention to nutritional balance is especially important today. Just as soil needs various minerals, your body also needs balanced nutrition without dietary bias. Today consciously choose one nutritious food.',
        zh: '今天特别注意营养均衡很重要。就像土壤需要各种矿物质，你的身体也需要均衡的营养，不偏食。今天有意识地选择一种有营养的食物。',
        ja: '栄養バランスに気を配ることが今日は特に重要です。土が様々なミネラルを必要とするように、あなたの体も偏食のない均衡の取れた栄養が必要です。今日、一つの栄養ある食べ物を意識的に選んでみてください。',
        es: 'Prestar atención al equilibrio nutricional es especialmente importante hoy. Al igual que el suelo necesita varios minerales, tu cuerpo también necesita nutrición equilibrada sin sesgos dietéticos. Hoy elige conscientemente un alimento nutritivo.',
      },
    ],
    low: [
      {
        ko: '과로에 주의해야 하는 날입니다. 몸이 보내는 피로의 신호는 흙이 비를 더 이상 흡수하지 못하는 것과 같은 경고입니다. 오늘은 몸의 소리를 무시하지 말고 적절한 휴식을 취하세요.',
        en: 'Today is a day to watch out for overwork. The signals of fatigue your body sends are warnings like soil that can no longer absorb rain. Do not ignore your body\'s voice today and take appropriate rest.',
        zh: '今天要注意过劳。身体发出的疲劳信号就像土壤无法再吸收雨水一样是警告。今天不要忽视身体的声音，适当休息。',
        ja: '過労に注意すべき日です。体が送る疲労のサインは、土がこれ以上雨を吸収できなくなることと同じ警告です。今日は体の声を無視せず、適切な休息を取ってください。',
        es: 'Hoy es un día para cuidarse del exceso de trabajo. Las señales de fatiga que envía tu cuerpo son advertencias como el suelo que ya no puede absorber la lluvia. No ignores la voz de tu cuerpo hoy y toma el descanso apropiado.',
      },
      {
        ko: '스트레스가 몸에 영향을 줄 수 있는 날입니다. 흙도 가뭄이 오면 갈라지듯, 오늘은 적절한 이완이 몸을 회복시키는 가장 좋은 방법입니다. 짧은 시간이라도 자신을 위한 여유를 만들어보세요.',
        en: 'Stress may affect your body today. Just as soil cracks during drought, appropriate relaxation is the best way to restore your body today. Even for a short time, create some breathing room for yourself.',
        zh: '今天压力可能影响身体。就像土壤在干旱时会开裂，今天适当的放松是恢复身体的最好方法。即使是短暂的时间，也为自己创造一些空间。',
        ja: 'ストレスが体に影響を与える可能性がある日です。土も干ばつが来ると割れるように、今日は適切なリラックスが体を回復させる最善の方法です。短い時間でも自分のためのゆとりを作ってみてください。',
        es: 'El estrés puede afectar tu cuerpo hoy. Al igual que el suelo se agrieta durante la sequía, la relajación apropiada es la mejor manera de restaurar tu cuerpo hoy. Incluso por un corto tiempo, crea algo de espacio para ti mismo.',
      },
      {
        ko: '건강 걱정이 오히려 건강을 해칠 수 있습니다. 지금 당신의 몸은 그리 나쁘지 않습니다—흙도 계절을 타듯, 몸도 좋은 날과 덜 좋은 날이 있을 뿐입니다. 긍정적인 마음으로 오늘 하루를 보내면 몸도 함께 회복됩니다.',
        en: 'Worrying about health can actually harm your health. Your body right now is not so bad—just as soil has its seasons, the body simply has better days and lesser days. Spending today with a positive mind will help your body recover too.',
        zh: '担心健康反而可能损害健康。你现在的身体并不那么糟糕——就像土壤有季节变化，身体也只是有好的一天和不那么好的一天。以积极的心态度过今天，身体也会一起恢复。',
        ja: '健康への心配がかえって健康を害する可能性があります。今のあなたの体はそれほど悪くありません—土も季節があるように、体も良い日と良くない日があるだけです。ポジティブな気持ちで今日一日を過ごせば、体も一緒に回復します。',
        es: 'Preocuparse por la salud en realidad puede dañar tu salud. Tu cuerpo ahora mismo no está tan mal—al igual que el suelo tiene sus estaciones, el cuerpo simplemente tiene mejores días y días menores. Pasar hoy con una mente positiva ayudará a que tu cuerpo se recupere también.',
      },
    ],
  },
  money: {
    high: [
      {
        ko: '재정적 안정이 강화되는 시기입니다. 꾸준히 쌓아온 저축과 신중한 투자가 오늘 그 진가를 발휘합니다. 이 탄탄한 기반 위에서 다음 단계의 재정적 목표를 설계해보세요.',
        en: 'Financial stability is being strengthened during this period. The savings you have consistently built and careful investments are showing their true worth today. Design your next financial goals on this solid foundation.',
        zh: '这个时期财务稳定性得到加强。你一贯积累的储蓄和谨慎的投资今天发挥出真正的价值。在这个坚实的基础上规划下一个财务目标。',
        ja: '財政的な安定が強化される時期です。着実に積み重ねてきた貯蓄と慎重な投資が今日、その真価を発揮します。この盤石な基盤の上で次の段階の財政的な目標を設計してみてください。',
        es: 'La estabilidad financiera se está fortaleciendo durante este período. Los ahorros que has acumulado consistentemente y las inversiones cuidadosas están mostrando su verdadero valor hoy. Diseña tus próximas metas financieras sobre esta base sólida.',
      },
      {
        ko: '장기 투자의 수익이 기대되는 날입니다. 씨앗을 심은 후 기다릴 줄 아는 사람만이 풍성한 수확을 얻듯, 당신의 인내가 오늘 재정적 열매로 돌아옵니다. 지금까지 기다려온 것이 틀리지 않았음을 확인하게 됩니다.',
        en: 'Returns from long-term investments are expected today. Just as only those who know how to wait after planting seeds obtain a rich harvest, your patience returns as financial fruit today. You will confirm that what you have waited for until now was not wrong.',
        zh: '今天期待长期投资的收益。就像只有知道在播种后等待的人才能获得丰盛的收获，你的耐心今天以财务果实的形式回来了。你会确认迄今为止等待的是正确的。',
        ja: '長期投資の収益が期待される日です。種を植えた後に待つことができる人だけが豊かな収穫を得るように、あなたの忍耐が今日財政的な果実として戻ってきます。これまで待ってきたことが間違いではなかったと確認することになります。',
        es: 'Se esperan retornos de inversiones a largo plazo hoy. Al igual que solo quienes saben esperar después de plantar semillas obtienen una cosecha rica, tu paciencia regresa como fruto financiero hoy. Confirmarás que lo que has esperado hasta ahora no estuvo mal.',
      },
      {
        ko: '현명한 재정 관리가 풍요를 가져오는 시기입니다. 비옥한 흙이 다양한 작물을 키우듯, 당신의 균형 잡힌 재정 관리가 다양한 형태의 풍요를 만들어냅니다. 오늘의 현명함이 내일의 풍요를 보장합니다.',
        en: 'Wise financial management is bringing abundance during this period. Just as fertile soil grows various crops, your balanced financial management creates abundance in various forms. Today\'s wisdom guarantees tomorrow\'s abundance.',
        zh: '明智的财务管理在这个时期带来丰盛。就像肥沃的土壤培育各种农作物，你均衡的财务管理创造各种形式的丰盛。今天的明智保障明天的丰盛。',
        ja: '賢明な財務管理が豊かさをもたらす時期です。肥沃な土が様々な作物を育てるように、あなたのバランスの取れた財務管理が様々な形の豊かさを作り出します。今日の賢明さが明日の豊かさを保証します。',
        es: 'La gestión financiera sabia está trayendo abundancia durante este período. Al igual que el suelo fértil cultiva varios cultivos, tu gestión financiera equilibrada crea abundancia en varias formas. La sabiduría de hoy garantiza la abundancia de mañana.',
      },
    ],
    medium: [
      {
        ko: '계획적인 지출로 재정 균형을 유지하는 것이 오늘의 핵심입니다. 흙이 영양분을 낭비 없이 분배하듯, 당신의 돈도 필요한 곳에 정확히 흘러가야 합니다. 오늘 지출 계획을 한 번 더 점검해보세요.',
        en: 'Maintaining financial balance with planned spending is the key today. Just as soil distributes nutrients without waste, your money should flow exactly where it is needed. Review your spending plan once more today.',
        zh: '今天通过计划性支出保持财务平衡是关键。就像土壤无浪费地分配营养，你的钱也应该精确地流向需要的地方。今天再检查一次支出计划。',
        ja: '計画的な支出で財政バランスを維持することが今日の重要事項です。土が栄養分を無駄なく分配するように、あなたのお金も必要な場所に正確に流れていく必要があります。今日、支出計画をもう一度点検してみてください。',
        es: 'Mantener el equilibrio financiero con gastos planificados es la clave hoy. Al igual que el suelo distribuye nutrientes sin desperdiciar, tu dinero debería fluir exactamente donde se necesita. Revisa tu plan de gastos una vez más hoy.',
      },
      {
        ko: '불필요한 지출을 줄이면 재정적 여유가 생깁니다. 흙에서 잡초를 뽑으면 더 많은 영양이 작물에게 가듯, 불필요한 지출을 정리하면 더 중요한 곳에 재원이 집중됩니다. 오늘 하나의 불필요한 지출을 찾아 없애보세요.',
        en: 'Reducing unnecessary expenses creates financial room. Just as pulling weeds from soil sends more nutrients to the crops, clearing unnecessary expenses concentrates resources toward more important places. Find and eliminate one unnecessary expense today.',
        zh: '减少不必要的支出会有财务余裕。就像从土壤中拔草让更多营养流向农作物，整理不必要的支出让更多资源集中在更重要的地方。今天找出一项不必要的支出并消除它。',
        ja: '不必要な支出を減らすと財政的な余裕が生まれます。土から雑草を抜くとより多くの栄養が作物に行くように、不必要な支出を整理するとより重要な場所に資金が集中します。今日、一つの不必要な支出を見つけてなくしてみてください。',
        es: 'Reducir gastos innecesarios crea espacio financiero. Al igual que arrancar malezas del suelo envía más nutrientes a los cultivos, eliminar gastos innecesarios concentra recursos hacia lugares más importantes. Encuentra y elimina un gasto innecesario hoy.',
      },
      {
        ko: '현실적인 예산 계획을 세우는 것이 재정적 안정의 시작입니다. 흙을 고르게 평탄화하는 작업이 좋은 수확의 기초가 되듯, 균형 잡힌 예산이 재정적 풍요의 기초가 됩니다. 오늘 간단한 예산 계획서를 작성해보세요.',
        en: 'Setting a realistic budget plan is the start of financial stability. Just as evenly leveling soil becomes the foundation for a good harvest, a balanced budget becomes the foundation of financial abundance. Write a simple budget plan today.',
        zh: '制定现实的预算计划是财务稳定的开始。就像均匀平整土地成为好收成的基础，均衡的预算成为财务丰盛的基础。今天写一份简单的预算计划。',
        ja: '現実的な予算計画を立てることが財政的安定の始まりです。土を均一に平坦化する作業が良い収穫の基礎になるように、バランスの取れた予算が財政的な豊かさの基礎になります。今日、簡単な予算計画書を作成してみてください。',
        es: 'Establecer un plan de presupuesto realista es el comienzo de la estabilidad financiera. Al igual que nivelar el suelo uniformemente se convierte en la base para una buena cosecha, un presupuesto equilibrado se convierte en la base de la abundancia financiera. Escribe un plan de presupuesto simple hoy.',
      },
    ],
    low: [
      {
        ko: '물질에 대한 지나친 집착을 내려놓아야 하는 날입니다. 흙이 씨앗을 너무 꽉 쥐면 숨이 막히듯, 돈에 대한 과도한 집착이 오히려 풍요를 막을 수 있습니다. 진정한 가치가 무엇인지를 오늘 다시 생각해보세요.',
        en: 'Today is the day to let go of excessive attachment to material things. Just as soil that grips seeds too tightly suffocates them, excessive attachment to money can actually block abundance. Reflect today on what truly has value.',
        zh: '今天是放下对物质过度执着的日子。就像土壤握得太紧会让种子窒息，对钱的过度执着反而可能阻碍丰盛。今天重新思考什么才是真正的价值。',
        ja: '物質への過度な執着を手放す必要がある日です。土が種を強く握りすぎると息が詰まるように、お金への過度な執着がかえって豊かさを妨げる可能性があります。本当の価値が何かを今日改めて考えてみてください。',
        es: 'Hoy es el día para soltar el apego excesivo a las cosas materiales. Al igual que el suelo que agarra las semillas demasiado fuerte las asfixia, el apego excesivo al dinero puede en realidad bloquear la abundancia. Reflexiona hoy sobre lo que verdaderamente tiene valor.',
      },
      {
        ko: '지나친 절약이 오히려 삶의 질을 떨어뜨릴 수 있는 시기입니다. 흙도 너무 건조하면 생명을 키우지 못하듯, 지나친 긴축은 삶에서 기쁨을 앗아갑니다. 오늘은 자신에게 작은 선물을 허락하고 삶을 즐기세요.',
        en: 'Excessive saving can lower quality of life during this period. Just as soil that is too dry cannot sustain life, excessive austerity takes joy away from life. Today allow yourself a small treat and enjoy life.',
        zh: '这个时期过度节约反而可能降低生活质量。就像土壤太干燥无法孕育生命，过度紧缩夺走了生活中的喜悦。今天给自己一点小奖励，享受生活。',
        ja: '過度な節約がかえって生活の質を下げる可能性がある時期です。土も乾燥しすぎると生命を育てられないように、過度な緊縮は生活から喜びを奪います。今日は自分に小さなご褒美を許して、生活を楽しんでください。',
        es: 'El ahorro excesivo puede reducir la calidad de vida durante este período. Al igual que el suelo demasiado seco no puede sostener la vida, la austeridad excesiva quita alegría de la vida. Hoy date un pequeño capricho y disfruta la vida.',
      },
      {
        ko: '예상치 못한 지출에 대비하는 것이 오늘의 현명한 준비입니다. 갑작스러운 가뭄에도 버틸 수 있는 흙처럼, 재정적 완충재를 미리 준비해두면 어떤 상황에도 흔들리지 않습니다. 비상금 마련을 오늘 시작해보세요.',
        en: 'Preparing for unexpected expenses is the wise preparation today. Like soil that can withstand sudden drought, having financial buffers prepared in advance means you will not be shaken by any situation. Start building an emergency fund today.',
        zh: '为意外支出做准备是今天明智的准备。像能够承受突然干旱的土壤一样，提前准备好财务缓冲垫，无论什么情况都不会动摇。今天开始准备应急资金。',
        ja: '予想外の支出に備えることが今日の賢明な準備です。突然の干ばつにも耐えられる土のように、財政的な緩衝材を事前に準備しておけばどんな状況にも揺るぎません。緊急資金の確保を今日から始めてみてください。',
        es: 'Prepararse para gastos inesperados es la preparación sabia hoy. Como suelo que puede soportar sequía repentina, tener colchones financieros preparados de antemano significa que no serás sacudido por ninguna situación. Comienza a construir un fondo de emergencia hoy.',
      },
    ],
  },
};

// Air (공기) - 쌍둥이자리, 천칭자리, 물병자리
const airTemplates: ElementTemplates = {
  overall: {
    high: [
      {
        ko: '새로운 아이디어와 영감이 바람처럼 밀려오는 날입니다. 이 지적 에너지는 당신이 향하는 모든 방향에서 새로운 가능성을 열어주며, 주변 사람들도 당신의 창의적 에너지를 느낍니다. 지금 이 영감의 흐름에 올라타세요—오늘 당신의 생각이 세상을 바꿀 수 있습니다.',
        en: 'New ideas and inspiration are flowing in like a wind today. This intellectual energy opens new possibilities in every direction you face, and those around you can feel your creative energy too. Ride this current of inspiration—today your thoughts have the power to change things.',
        zh: '今天新想法和灵感如风涌来。这种智识能量在你面对的每个方向都打开新的可能性，周围的人也感受到你的创意能量。抓住这股灵感的洪流——今天你的想法有能力改变事物。',
        ja: '新しいアイデアとインスピレーションが風のように押し寄せる日です。この知的エネルギーはあなたが向かうすべての方向で新しい可能性を開き、周りの人々もあなたの創造的なエネルギーを感じています。今このインスピレーションの流れに乗ってください—今日のあなたの考えが世界を変えることができます。',
        es: 'Nuevas ideas e inspiración fluyen como viento hoy. Esta energía intelectual abre nuevas posibilidades en cada dirección que enfrentas, y quienes te rodean también pueden sentir tu energía creativa. Súbete a esta corriente de inspiración—hoy tus pensamientos tienen el poder de cambiar las cosas.',
      },
      {
        ko: '소통과 교류가 행운을 부르는 날입니다. 오늘 나누는 대화 하나하나가 새로운 문을 열어주며, 당신의 말에는 사람들을 움직이는 힘이 담겨 있습니다. 적극적으로 이야기하고, 경청하고, 연결하세요—오늘 그 모든 것이 당신의 행운이 됩니다.',
        en: 'Communication and exchange are calling in good fortune today. Every conversation you have is opening new doors, and your words carry the power to move people. Speak actively, listen deeply, and connect—today all of that becomes your luck.',
        zh: '今天沟通和交流召唤好运。你进行的每一次对话都打开新的门，你的话语有感动人心的力量。积极发言、深入倾听、建立连接——今天这一切都会成为你的幸运。',
        ja: 'コミュニケーションと交流が幸運を呼ぶ日です。今日交わす会話一つ一つが新しい扉を開き、あなたの言葉には人々を動かす力が込められています。積極的に話し、聞き、つながってください—今日そのすべてがあなたの幸運となります。',
        es: 'La comunicación e intercambio están atrayendo buena fortuna hoy. Cada conversación que tienes está abriendo nuevas puertas, y tus palabras llevan el poder de mover a las personas. Habla activamente, escucha profundamente y conecta—hoy todo eso se convierte en tu suerte.',
      },
      {
        ko: '지적 호기심이 좋은 결과로 이어지는 날입니다. 배움의 기회가 도처에 있으며, 당신이 알고 싶어하는 모든 것에 오늘 답이 가까이 있습니다. 호기심을 따라 움직이세요—오늘은 아는 것이 곧 이기는 것입니다.',
        en: 'Intellectual curiosity leads to good results today. Learning opportunities are everywhere, and answers to everything you want to know are close at hand today. Follow your curiosity—today, knowing is winning.',
        zh: '今天求知欲带来好结果。学习机会到处都是，今天你想知道的一切答案都近在眼前。跟随好奇心行动——今天，知道就是赢得。',
        ja: '知的好奇心が良い結果につながる日です。学びの機会があちこちにあり、あなたが知りたいすべてのことへの答えが今日近くにあります。好奇心に従って動いてください—今日は知ることが即ち勝つことです。',
        es: 'La curiosidad intelectual conduce a buenos resultados hoy. Las oportunidades de aprendizaje están en todas partes, y las respuestas a todo lo que quieres saber están al alcance de la mano hoy. Sigue tu curiosidad—hoy, saber es ganar.',
      },
    ],
    medium: [
      {
        ko: '다양한 관점을 고려하면 오늘의 해답이 보입니다. 바람이 여러 방향에서 불어오듯, 당신의 생각도 다각도에서 접근할 때 가장 명확한 해답을 찾을 수 있습니다. 한 가지 시각에 고정되지 말고 다양하게 탐색해보세요.',
        en: 'Considering various perspectives reveals today\'s answers. Just as wind blows from many directions, your thinking finds the clearest answers when approached from multiple angles. Do not fix yourself to one viewpoint—explore broadly.',
        zh: '考虑各种观点能找到今天的答案。就像风从多个方向吹来，你的思维从多角度接近时能找到最清晰的答案。不要固守一种视角——广泛探索。',
        ja: '様々な視点を考慮すれば今日の答えが見えてきます。風が様々な方向から吹いてくるように、あなたの考えも多角的にアプローチする時に最も明確な答えを見つけることができます。一つの視点に固執せず、多様に探索してみてください。',
        es: 'Considerar diversas perspectivas revela las respuestas de hoy. Al igual que el viento sopla desde muchas direcciones, tu pensamiento encuentra las respuestas más claras cuando se aborda desde múltiples ángulos. No te fijes en un solo punto de vista—explora ampliamente.',
      },
      {
        ko: '오늘은 가벼운 마음으로 상황을 바라보는 것이 지혜입니다. 바람이 장애물을 돌아 흐르듯, 지금의 어려움도 너무 심각하게 받아들이지 않으면 자연스럽게 길을 찾게 됩니다. 여유로운 시선이 오늘 당신의 가장 강한 무기입니다.',
        en: 'Looking at the situation with a light heart is wisdom today. Just as wind flows around obstacles, you will naturally find a way through current difficulties when you do not take them too seriously. A relaxed perspective is your strongest asset today.',
        zh: '今天以轻松的心态看待情况是智慧。就像风绕过障碍流动，当你不把当前的困难看得太严重时，自然会找到出路。轻松的视角是今天你最强大的武器。',
        ja: '今日は軽い気持ちで状況を見ることが知恵です。風が障害を迂回して流れるように、今の困難もあまり深刻に受け止めなければ自然に道を見つけることになります。余裕のある視線が今日のあなたの最も強い武器です。',
        es: 'Mirar la situación con corazón ligero es sabiduría hoy. Al igual que el viento fluye alrededor de los obstáculos, encontrarás naturalmente un camino a través de las dificultades actuales cuando no las tomes demasiado en serio. Una perspectiva relajada es tu activo más fuerte hoy.',
      },
      {
        ko: '정보를 수집하고 연결하는 것이 오늘의 핵심입니다. 바람이 씨앗을 퍼뜨리듯, 당신이 모으는 정보들이 예상치 못한 방향에서 새로운 기회를 만들어냅니다. 주변을 잘 살펴보고 놓치고 있는 신호들에 주목해보세요.',
        en: 'Gathering and connecting information is the key today. Just as wind scatters seeds, the information you collect creates unexpected new opportunities. Pay attention to your surroundings and notice the signals you might be missing.',
        zh: '今天收集和连接信息是关键。就像风传播种子，你收集的信息从意想不到的方向创造新机会。仔细观察周围，注意你可能遗漏的信号。',
        ja: '情報を収集してつなげることが今日の重要事項です。風が種を広げるように、あなたが集める情報が予想外の方向から新しい機会を作り出します。周りをよく見渡して、見落としているシグナルに注目してみてください。',
        es: 'Recopilar y conectar información es la clave hoy. Al igual que el viento dispersa semillas, la información que recopilas crea nuevas oportunidades inesperadas. Presta atención a tu entorno y observa las señales que podrías estar perdiendo.',
      },
    ],
    low: [
      {
        ko: '생각이 너무 많아 결정을 미루고 싶은 날입니다. 바람이 너무 강하면 오히려 방향을 잃듯, 과도한 분석이 지금 당신을 멈추게 하고 있습니다. 완벽한 답을 찾으려 하지 말고 지금 가진 정보로 직감을 믿고 움직여보세요.',
        en: 'Too many thoughts make you want to delay decisions today. Just as wind too strong loses direction, excessive analysis is stopping you right now. Instead of looking for the perfect answer, trust your instinct with the information you have and move.',
        zh: '今天想太多让你想推迟决定。就像风太强反而失去方向，过度分析现在让你停滞不前。不要寻找完美答案，用现有的信息相信直觉并行动。',
        ja: '考えすぎて決定を先延ばしにしたい日です。風が強すぎるとかえって方向を失うように、過度な分析が今あなたを止めています。完璧な答えを探そうとせず、今持っている情報で直感を信じて動いてみてください。',
        es: 'Demasiados pensamientos te hacen querer retrasar las decisiones hoy. Al igual que el viento demasiado fuerte pierde dirección, el análisis excesivo te está deteniendo ahora mismo. En lugar de buscar la respuesta perfecta, confía en tu instinto con la información que tienes y muévete.',
      },
      {
        ko: '산만함이 오늘의 적입니다. 바람처럼 이것저것 흩어지다 보면 아무것도 잡지 못하게 됩니다. 지금 가장 중요한 한 가지를 선택하고, 오늘은 그것 하나에만 집중하는 연습을 해보세요.',
        en: 'Distraction is the enemy today. Scattering from thing to thing like the wind means you end up grasping nothing. Choose the one most important thing right now and practice focusing on just that one thing today.',
        zh: '今天分心是敌人。像风一样四散意味着什么都抓不住。选择现在最重要的一件事，今天只专注于那一件事进行练习。',
        ja: '散漫さが今日の敵です。風のようにあれこれ散らかっていると、何も掴めなくなります。今最も重要なことを一つ選んで、今日はそれ一つだけに集中する練習をしてみてください。',
        es: 'La distracción es el enemigo hoy. Dispersarse de cosa en cosa como el viento significa que terminas sin agarrar nada. Elige la única cosa más importante ahora mismo y practica enfocarte solo en esa cosa hoy.',
      },
      {
        ko: '말보다 행동이 필요한 시기입니다. 아이디어는 풍부하지만 실행이 뒤따르지 않으면 바람 속의 씨앗처럼 어디에도 뿌리내리지 못합니다. 오늘은 생각을 멈추고 행동 하나를 실천에 옮기세요—그 작은 한 걸음이 모든 것을 바꿉니다.',
        en: 'Action is needed over words during this period. Ideas are plentiful, but without execution they are like seeds in the wind—never taking root anywhere. Today stop thinking and put one action into practice—that small step changes everything.',
        zh: '这个时期需要行动而非言语。想法丰富，但如果没有执行，就像风中的种子——无处扎根。今天停止思考，将一个行动付诸实践——那一小步改变一切。',
        ja: '言葉より行動が必要な時期です。アイデアは豊富でも実行が伴わなければ、風の中の種のようにどこにも根を張ることができません。今日は考えるのを止めて、行動一つを実践に移してください—その小さな一歩がすべてを変えます。',
        es: 'Se necesita acción sobre palabras durante este período. Las ideas son abundantes, pero sin ejecución son como semillas en el viento—sin echar raíces en ningún lugar. Hoy deja de pensar y pon una acción en práctica—ese pequeño paso lo cambia todo.',
      },
    ],
  },
  love: {
    high: [
      {
        ko: '대화를 통해 두 마음이 통하는 날입니다. 오늘 나누는 솔직한 이야기가 관계를 새로운 차원으로 끌어올립니다. 마음속에 담아두었던 것을 말로 꺼내보세요—공기처럼 가볍고 자유롭게 흐르는 소통이 가장 깊은 연결을 만듭니다.',
        en: 'Today two hearts connect through conversation. The honest talk you share today lifts the relationship to a new dimension. Bring out what you have been holding inside—communication that flows as lightly and freely as air creates the deepest connections.',
        zh: '今天通过对话两颗心相通。你今天分享的坦诚交谈将关系提升到新的维度。把心里装的说出来——像空气一样轻盈自由流动的沟通创造最深的连接。',
        ja: '会話を通じて二つの心が通じ合う日です。今日交わす率直な話が関係を新たな次元に引き上げます。心の中に留めていたことを言葉にしてみてください—空気のように軽く自由に流れるコミュニケーションが最も深いつながりを作ります。',
        es: 'Hoy dos corazones se conectan a través de la conversación. La charla honesta que compartes hoy eleva la relación a una nueva dimensión. Saca lo que has estado guardando dentro—la comunicación que fluye tan ligera y libremente como el aire crea las conexiones más profundas.',
      },
      {
        ko: '지적인 교감이 사랑을 더 깊고 단단하게 합니다. 오늘 함께 새로운 것을 배우거나 깊은 대화를 나눠보세요. 마음이 서로 공명할 때 사랑은 두 배로 커집니다.',
        en: 'Intellectual connection makes love deeper and more solid today. Try learning something new together or having a deep conversation. When minds resonate with each other, love grows twice as strong.',
        zh: '今天智识上的交流使爱情更深更坚实。试着一起学习新事物或进行深入对话。当心灵相互共鸣时，爱情会加倍增长。',
        ja: '知的な交感が愛をより深く確かなものにします。今日、一緒に新しいことを学んだり、深い会話を交わしてみてください。心が互いに共鳴する時、愛は二倍に大きくなります。',
        es: 'La conexión intelectual hace el amor más profundo y sólido hoy. Intenta aprender algo nuevo juntos o tener una conversación profunda. Cuando las mentes resuenan entre sí, el amor crece el doble de fuerte.',
      },
      {
        ko: '새로운 만남의 기회가 바람처럼 찾아오는 날입니다. 사교 활동에 적극적으로 참여하면 예상치 못한 인연이 기다리고 있습니다. 자유롭고 가벼운 마음으로 열려 있으세요—가장 좋은 인연은 억지로 찾는 것이 아니라 바람처럼 자연스럽게 옵니다.',
        en: 'New meeting opportunities come like wind today. Participating actively in social activities reveals unexpected connections waiting for you. Stay open with a free and light heart—the best connections are not forced but come naturally like the wind.',
        zh: '今天新邂逅的机会如风而来。积极参与社交活动，意想不到的缘分正在等待。以自由轻松的心保持开放——最好的缘分不是强求的，而是像风一样自然而来。',
        ja: '新しい出会いの機会が風のように訪れる日です。社交活動に積極的に参加すると、予想外の縁が待っています。自由で軽い気持ちで開かれていてください—最も良い縁は無理に探すのではなく、風のように自然にやってきます。',
        es: 'Las oportunidades de nuevos encuentros llegan como el viento hoy. Participar activamente en actividades sociales revela conexiones inesperadas esperándote. Mantente abierto con corazón libre y ligero—las mejores conexiones no se fuerzan sino que vienen naturalmente como el viento.',
      },
    ],
    medium: [
      {
        ko: '가벼운 대화가 관계를 부드럽게 풀어주는 날입니다. 무거운 이야기보다 오늘은 웃음과 유머로 상대방과 가까워지는 것이 효과적입니다. 공기처럼 가볍지만 없어서는 안 되는 것이 일상 속 소소한 대화입니다.',
        en: 'Light conversation gently loosens the relationship today. Getting closer through laughter and humor is more effective than heavy topics today. Like air—light but indispensable—everyday small talk holds relationships together.',
        zh: '今天轻松的对话温和地疏通关系。今天通过笑声和幽默接近对方比沉重的话题更有效。像空气一样轻盈但不可或缺，日常的小对话维系着关系。',
        ja: '軽い会話が関係を和らかく解きほぐす日です。重い話よりも今日は笑いとユーモアで相手に近づくことが効果的です。空気のように軽いけれどなくてはならないものが、日常の中の些細な会話です。',
        es: 'La conversación ligera afloja suavemente la relación hoy. Acercarse a través de la risa y el humor es más efectivo que los temas pesados hoy. Como el aire—ligero pero indispensable—la pequeña charla cotidiana mantiene las relaciones unidas.',
      },
      {
        ko: '상대방의 생각에 귀 기울이는 것이 오늘 사랑을 키우는 방법입니다. 바람이 모든 것을 듣듯, 판단 없이 상대방의 말을 온전히 받아들이면 관계가 더 깊어집니다. 오늘은 말하기보다 듣기에 집중해보세요.',
        en: 'Listening to your partner\'s thoughts is how love grows today. Just as wind hears everything, accepting your partner\'s words fully without judgment deepens the relationship. Today focus on listening rather than speaking.',
        zh: '今天倾听对方的想法是培养爱情的方法。就像风听到一切，无判断地完全接受对方的话语会加深关系。今天专注于倾听而不是说话。',
        ja: '相手の考えに耳を傾けることが今日愛を育てる方法です。風がすべてを聞くように、判断なく相手の言葉を完全に受け入れると関係がより深くなります。今日は話すよりも聴くことに集中してみてください。',
        es: 'Escuchar los pensamientos de tu pareja es cómo crece el amor hoy. Al igual que el viento escucha todo, aceptar completamente las palabras de tu pareja sin juzgar profundiza la relación. Hoy enfócate en escuchar en lugar de hablar.',
      },
      {
        ko: '친구 같은 편안한 관계가 사랑의 가장 깊은 기반이 됩니다. 오늘은 연인으로서보다 서로의 가장 좋은 친구로서 시간을 보내보세요. 가장 자유롭게 자신을 드러낼 수 있는 관계가 가장 강한 사랑입니다.',
        en: 'A comfortable friendship-like relationship becomes the deepest foundation of love. Today spend time as each other\'s best friends rather than as romantic partners. The relationship where you can reveal yourself most freely is the strongest love.',
        zh: '像朋友一样舒适的关系成为爱情最深的基础。今天试着作为彼此最好的朋友而不是恋人来度过时光。能最自由展现自己的关系是最强大的爱。',
        ja: '友達のような居心地の良い関係が愛の最も深い基盤となります。今日は恋人としてよりも、お互いの最も良い友人として時間を過ごしてみてください。最も自由に自分をさらけ出せる関係が最も強い愛です。',
        es: 'Una relación cómoda como amistad se convierte en la base más profunda del amor. Hoy pasa tiempo como los mejores amigos del otro en lugar de como pareja romántica. La relación donde puedes revelarte más libremente es el amor más fuerte.',
      },
    ],
    low: [
      {
        ko: '말실수가 관계를 흔들 수 있는 날입니다. 바람이 때로는 너무 강해서 꽃을 꺾어버리듯, 오늘의 말은 신중하게 골라야 합니다. 상대방의 감정을 먼저 헤아린 다음 이야기하면, 대화가 연결이 아닌 상처가 되는 것을 막을 수 있습니다.',
        en: 'A slip of the tongue can shake the relationship today. Just as wind sometimes blows too strong and breaks a flower, choose your words carefully today. Considering your partner\'s feelings before speaking prevents conversation from becoming wounds rather than connection.',
        zh: '今天说错话可能动摇关系。就像风有时太强会折断花朵，今天要谨慎选择言辞。先体察对方的感受再说话，可以防止对话成为伤害而非连接。',
        ja: '言い間違いが関係を揺るがす可能性がある日です。風が時に強すぎて花を折ってしまうように、今日の言葉は慎重に選ばなければなりません。相手の感情をまず汲み取ってから話すと、会話がつながりではなく傷になることを防げます。',
        es: 'Un lapsus puede sacudir la relación hoy. Al igual que el viento a veces sopla demasiado fuerte y rompe una flor, elige tus palabras con cuidado hoy. Considerar los sentimientos de tu pareja antes de hablar evita que la conversación se convierta en heridas en lugar de conexión.',
      },
      {
        ko: '너무 분석적인 접근이 오히려 사랑을 멀어지게 할 수 있습니다. 바람은 감촉으로 느끼는 것이지 설명으로 이해하는 것이 아니듯, 사랑도 분석보다 느낌으로 다가가세요. 오늘은 이성보다 감성에 더 귀를 기울여보세요.',
        en: 'Too analytical an approach may actually push love further away today. Just as wind is felt through touch rather than understood through explanation, approach love through feeling rather than analysis. Today listen more to emotion than to reason.',
        zh: '今天过于分析的方式反而可能让爱情疏远。就像风是通过触感感受的而非通过解释理解的，用感觉而非分析来接近爱情。今天比起理性更多倾听感性。',
        ja: 'あまり分析的なアプローチがかえって愛を遠ざける可能性があります。風は説明で理解するのではなく感触で感じるように、愛も分析よりも感覚でアプローチしてください。今日は理性より感性にもっと耳を傾けてみてください。',
        es: 'Un enfoque demasiado analítico puede en realidad alejar el amor hoy. Al igual que el viento se siente a través del tacto en lugar de entenderse a través de la explicación, acércate al amor a través del sentimiento en lugar del análisis. Hoy escucha más a la emoción que a la razón.',
      },
      {
        ko: '결정을 미루다 사랑의 기회를 놓칠 수 있는 날입니다. 바람은 기다려주지 않습니다—지금 마음이 가는 방향으로 용기를 내세요. 완벽한 타이밍을 찾는 것보다 지금 이 순간이 오히려 최적의 시간일 수 있습니다.',
        en: 'Delaying decisions may cause you to miss love opportunities today. Wind does not wait—take courage and go in the direction your heart is moving. This very moment may actually be the optimal time rather than searching for perfect timing.',
        zh: '今天推迟决定可能错失爱情机会。风不会等待——鼓起勇气朝着心之所向前进。与其寻找完美时机，此刻反而可能是最佳时间。',
        ja: '決定を先延ばしにして愛のチャンスを逃す可能性がある日です。風は待ってくれません—今心が向かう方向に勇気を出してください。完璧なタイミングを探すよりも、今この瞬間がかえって最適な時間かもしれません。',
        es: 'Retrasar las decisiones puede hacer que pierdas oportunidades de amor hoy. El viento no espera—toma coraje y ve en la dirección hacia donde se mueve tu corazón. Este mismo momento puede ser en realidad el tiempo óptimo en lugar de buscar el momento perfecto.',
      },
    ],
  },
  career: {
    high: [
      {
        ko: '창의적인 아이디어가 인정받는 날입니다. 오늘 당신의 새로운 제안이 주목받을 가능성이 높으며, 바람처럼 자유롭게 생각을 펼치는 것이 최고의 결과를 만들어냅니다. 주저하지 말고 아이디어를 공유하세요—오늘 당신의 생각이 팀을 이끕니다.',
        en: 'Creative ideas are recognized today. Your new proposals are likely to attract attention today, and letting your thoughts flow as freely as wind creates the best results. Share your ideas without hesitation—today your thinking leads the team.',
        zh: '今天创意想法得到认可。你的新提案今天很可能引起关注，像风一样自由地展开思维创造最好的结果。毫不犹豫地分享想法——今天你的思维引领团队。',
        ja: '創造的なアイデアが認められる日です。今日のあなたの新しい提案が注目される可能性が高く、風のように自由に考えを広げることが最高の結果を生み出します。躊躇せずアイデアを共有してください—今日のあなたの考えがチームを導きます。',
        es: 'Las ideas creativas son reconocidas hoy. Tus nuevas propuestas probablemente atraigan atención hoy, y dejar que tus pensamientos fluyan tan libremente como el viento crea los mejores resultados. Comparte tus ideas sin dudar—hoy tu pensamiento lidera al equipo.',
      },
      {
        ko: '커뮤니케이션 능력이 빛나는 시기입니다. 발표나 회의에서 당신의 말이 사람들의 마음을 움직이고, 복잡한 것을 간결하게 전달하는 능력이 오늘 특히 뛰어납니다. 이 기회를 활용해 당신의 생각을 명확하게 전달하세요.',
        en: 'Your communication skills are shining during this period. Your words move people\'s hearts in presentations or meetings, and your ability to convey complex things concisely is particularly excellent today. Use this opportunity to communicate your thoughts clearly.',
        zh: '这个时期沟通能力闪耀。在演讲或会议中你的话语感动人心，今天简洁传达复杂事物的能力特别出色。利用这个机会清晰传达你的想法。',
        ja: 'コミュニケーション能力が輝く時期です。発表や会議でのあなたの言葉が人々の心を動かし、複雑なことを簡潔に伝える能力が今日は特に優れています。この機会を活かしてあなたの考えを明確に伝えてください。',
        es: 'Tus habilidades de comunicación están brillando durante este período. Tus palabras mueven los corazones de las personas en presentaciones o reuniones, y tu capacidad para transmitir cosas complejas de manera concisa es particularmente excelente hoy. Usa esta oportunidad para comunicar tus pensamientos claramente.',
      },
      {
        ko: '네트워킹이 새로운 기회를 불러오는 날입니다. 바람이 씨앗을 멀리까지 옮기듯, 오늘의 연결이 미래에 예상치 못한 풍성한 결실을 가져다줄 것입니다. 적극적으로 관계를 확장하고 새로운 사람들과 연결되세요.',
        en: 'Networking is calling in new opportunities today. Just as wind carries seeds far, today\'s connections will bring unexpected abundant results in the future. Actively expand your network and connect with new people.',
        zh: '今天建立人脉带来新机会。就像风将种子带到远方，今天的连接将在未来带来意想不到的丰盛成果。积极扩展关系网，与新的人建立连接。',
        ja: 'ネットワーキングが新しい機会をもたらす日です。風が種を遠くまで運ぶように、今日のつながりが将来に予想外の豊かな結実をもたらしてくれるでしょう。積極的に関係を広げ、新しい人々とつながってください。',
        es: 'El networking está atrayendo nuevas oportunidades hoy. Al igual que el viento lleva semillas lejos, las conexiones de hoy traerán resultados abundantes e inesperados en el futuro. Expande activamente tu red y conecta con nuevas personas.',
      },
    ],
    medium: [
      {
        ko: '팀과의 소통에 집중하는 것이 오늘의 전략입니다. 공기가 모두에게 필요하듯, 당신의 소통 능력이 팀 전체를 원활하게 만들어줍니다. 오늘은 정보를 잘 공유하고 모두가 같은 방향을 바라볼 수 있도록 연결해주세요.',
        en: 'Focusing on communication with the team is the strategy today. Just as air is needed by everyone, your communication ability makes the entire team run smoothly. Today share information well and connect everyone so they can look in the same direction.',
        zh: '今天专注于与团队的沟通是策略。就像所有人都需要空气，你的沟通能力让整个团队顺畅运转。今天好好分享信息，连接所有人使其朝同一方向看。',
        ja: 'チームとのコミュニケーションに集中することが今日の戦略です。空気が誰にとっても必要なように、あなたのコミュニケーション能力がチーム全体をスムーズにしてくれます。今日は情報をうまく共有し、全員が同じ方向を向けるようにつなげてください。',
        es: 'Enfocarse en la comunicación con el equipo es la estrategia hoy. Al igual que el aire es necesario para todos, tu habilidad de comunicación hace que todo el equipo funcione sin problemas. Hoy comparte información bien y conecta a todos para que puedan mirar en la misma dirección.',
      },
      {
        ko: '다양한 업무를 효율적으로 처리하되, 우선순위를 잃지 마세요. 바람처럼 여러 곳을 동시에 다닐 수 있는 것이 당신의 강점이지만, 너무 분산되면 아무것도 완성되지 않습니다. 오늘은 가장 중요한 것 두세 가지에 집중하세요.',
        en: 'Handle various tasks efficiently but do not lose your priorities. Moving to many places simultaneously like the wind is your strength, but spreading too thin means nothing gets completed. Focus on the two or three most important things today.',
        zh: '高效处理各种工作，但不要失去优先级。像风一样同时去多个地方是你的优势，但分散太多意味着什么都无法完成。今天专注于最重要的两三件事。',
        ja: '様々な業務を効率的に処理しながら、優先順位を失わないようにしてください。風のように複数の場所に同時に行けることがあなたの強みですが、あまり分散しすぎると何も完成しなくなります。今日は最も重要な2〜3つのことに集中してください。',
        es: 'Maneja varias tareas eficientemente pero no pierdas tus prioridades. Moverse a muchos lugares simultáneamente como el viento es tu fortaleza, pero dispersarse demasiado significa que nada se completa. Enfócate en las dos o tres cosas más importantes hoy.',
      },
      {
        ko: '정보 공유가 팀 전체의 성과를 높이는 날입니다. 당신이 알고 있는 것을 아끼지 말고 나누면, 그 공유가 예상보다 훨씬 큰 파급 효과를 만들어냅니다. 오늘의 개방성이 내일의 협력으로 이어집니다.',
        en: 'Sharing information raises the entire team\'s performance today. Sharing what you know generously creates a ripple effect far larger than expected. Today\'s openness leads to tomorrow\'s collaboration.',
        zh: '今天信息共享提高整个团队的绩效。慷慨地分享你所知道的，这种分享会产生比预期大得多的连锁反应。今天的开放性引向明天的合作。',
        ja: '情報共有がチーム全体の成果を高める日です。あなたが知っていることを惜しまずに分かち合うと、その共有が予想以上にはるかに大きな波及効果を生み出します。今日の開放性が明日の協力につながります。',
        es: 'Compartir información eleva el rendimiento de todo el equipo hoy. Compartir lo que sabes generosamente crea un efecto dominó mucho mayor de lo esperado. La apertura de hoy lleva a la colaboración de mañana.',
      },
    ],
    low: [
      {
        ko: '집중력이 흐트러지기 쉬운 날입니다. 바람이 여러 방향으로 불면 열기구는 표류하듯, 오늘은 한 번에 하나에만 집중하지 않으면 모든 것이 중간에 멈춥니다. 가장 중요한 일 하나를 완료하는 것만으로도 오늘은 성공입니다.',
        en: 'Concentration easily scatters today. Just as a hot air balloon drifts when wind blows in multiple directions, everything stalls halfway if you do not focus on one thing at a time today. Completing just one most important task is success today.',
        zh: '今天注意力容易分散。就像热气球在风吹向多个方向时会漂流，今天如果不专注于一次一件事，所有事情都会中途停止。仅仅完成一件最重要的事今天就是成功。',
        ja: '集中力が乱れやすい日です。風が複数の方向に吹くと気球が漂流するように、今日は一度に一つのことだけに集中しなければすべてが中途半端になります。最も重要な仕事一つを完了させるだけで今日は成功です。',
        es: 'La concentración se dispersa fácilmente hoy. Al igual que un globo aerostático deriva cuando el viento sopla en múltiples direcciones, todo se detiene a medias si no te enfocas en una cosa a la vez hoy. Completar solo la tarea más importante es éxito hoy.',
      },
      {
        ko: '말보다 결과로 보여주어야 하는 시기입니다. 아이디어와 계획은 풍부하지만, 오늘은 실제로 무언가를 완성해서 가져가야 합니다. 작더라도 눈에 보이는 결과물 하나가 열 개의 훌륭한 아이디어보다 오늘은 더 가치 있습니다.',
        en: 'This is the time to show results rather than words. Ideas and plans are abundant, but today you need to actually complete something tangible. One visible result, however small, is more valuable today than ten brilliant ideas.',
        zh: '这是需要用结果而非言语来证明的时期。想法和计划很丰富，但今天需要实际完成并带来一些东西。一个可见的结果，无论多小，今天都比十个绝妙的想法更有价值。',
        ja: '言葉より結果で示すことが必要な時期です。アイデアと計画は豊富ですが、今日は実際に何かを完成させて持っていく必要があります。小さくても目に見える成果物一つが、今日は十個の素晴らしいアイデアよりも価値があります。',
        es: 'Este es el momento de mostrar resultados en lugar de palabras. Las ideas y planes son abundantes, pero hoy necesitas completar algo tangible. Un resultado visible, por pequeño que sea, es más valioso hoy que diez ideas brillantes.',
      },
      {
        ko: '약속을 지키는 것이 오늘 신뢰를 지키는 방법입니다. 바람처럼 자유롭게 움직이는 것이 당신의 본성이지만, 오늘만큼은 한 가지 약속을 반드시 지키세요. 그 작은 신뢰의 축적이 당신의 가장 강력한 자산입니다.',
        en: 'Keeping promises is how you protect trust today. Moving freely like the wind is your nature, but today especially, keep at least one promise without fail. The small accumulation of that trust is your most powerful asset.',
        zh: '今天遵守承诺是维护信任的方式。像风一样自由移动是你的本性，但今天尤其要确保遵守一个承诺。那份小小信任的积累是你最强大的资产。',
        ja: '約束を守ることが今日、信頼を守る方法です。風のように自由に動くことがあなたの本性ですが、今日こそは一つの約束を必ず守ってください。その小さな信頼の積み重ねが、あなたの最も強力な資産です。',
        es: 'Cumplir promesas es cómo proteges la confianza hoy. Moverte libremente como el viento es tu naturaleza, pero hoy especialmente, cumple al menos una promesa sin falta. La pequeña acumulación de esa confianza es tu activo más poderoso.',
      },
    ],
  },
  health: {
    high: [
      {
        ko: '정신적 활력이 넘치는 날입니다. 바람이 공기를 정화하듯, 오늘 당신의 마음은 맑고 선명하게 작동하고 있습니다. 이 정신적 에너지를 새로운 것을 배우거나 창의적인 활동에 쏟아보세요—몸과 마음이 함께 빛납니다.',
        en: 'Mental vitality overflows today. Just as wind purifies the air, your mind is working clearly and sharply today. Pour this mental energy into learning something new or creative activities—body and mind shine together.',
        zh: '今天精神活力充沛。就像风净化空气，你的心今天工作得清晰而敏锐。将这种精神能量投入学习新事物或创意活动——身心一起发光。',
        ja: '精神的な活力に溢れる日です。風が空気を浄化するように、今日のあなたの心は澄んで鮮明に働いています。この精神的エネルギーを新しいことを学んだり創造的な活動に注いでみてください—体と心が一緒に輝きます。',
        es: 'La vitalidad mental desborda hoy. Al igual que el viento purifica el aire, tu mente está trabajando clara y nítidamente hoy. Vierte esta energía mental en aprender algo nuevo o actividades creativas—cuerpo y mente brillan juntos.',
      },
      {
        ko: '사교 활동이 몸과 마음을 동시에 살리는 날입니다. 바람이 풍경화를 그리는 것처럼, 사람들과의 교류가 오늘 당신의 에너지를 아름답게 채워줍니다. 혼자보다 함께할 때 더 건강해지는 날입니다.',
        en: 'Social activities revive both body and mind simultaneously today. Just as wind paints the landscape, interaction with people beautifully fills your energy today. You become healthier together than alone today.',
        zh: '今天社交活动同时振奋身心。就像风描绘风景，与人交流今天美丽地填充你的能量。今天与他人在一起比独处更健康。',
        ja: '社交活動が体と心を同時に生き生きとさせる日です。風が風景画を描くように、人々との交流が今日のあなたのエネルギーを美しく満たしてくれます。一人よりも一緒にいる時により健康になる日です。',
        es: 'Las actividades sociales reviven cuerpo y mente simultáneamente hoy. Al igual que el viento pinta el paisaje, la interacción con personas llena tu energía bellamente hoy. Te vuelves más saludable junto a otros que solo hoy.',
      },
      {
        ko: '호흡과 명상이 특별한 효과를 발휘하는 날입니다. 공기를 의식적으로 들이쉬고 내쉬는 것만으로도 오늘은 몸의 긴장이 풀리고 마음이 맑아집니다. 바람을 느끼며 잠깐이라도 야외에서 시간을 보내보세요.',
        en: 'Breathing and meditation have special effects today. Even simply breathing in and out consciously releases bodily tension and clears the mind today. Take even a brief moment outside, feeling the wind.',
        zh: '今天呼吸和冥想发挥特殊效果。今天仅仅有意识地呼气吸气就能释放身体紧张，澄清心灵。感受着风，在户外度过片刻时光。',
        ja: '呼吸と瞑想が特別な効果を発揮する日です。意識的に息を吸って吐くだけでも、今日は体の緊張がほぐれて心が澄んできます。風を感じながら少しでも屋外で時間を過ごしてみてください。',
        es: 'La respiración y la meditación tienen efectos especiales hoy. Incluso simplemente respirar de manera consciente libera la tensión corporal y aclara la mente hoy. Toma aunque sea un breve momento afuera, sintiendo el viento.',
      },
    ],
    medium: [
      {
        ko: '정신 건강에 신경 쓰는 것이 오늘 특히 중요합니다. 바람이 막히면 공기가 탁해지듯, 스트레스를 쌓아두지 말고 오늘 발산할 방법을 찾으세요. 짧은 산책이나 가벼운 대화가 지금 당신에게 가장 좋은 약입니다.',
        en: 'Paying attention to mental health is especially important today. Just as air becomes stale when wind is blocked, find a way to release rather than accumulate stress today. A short walk or light conversation is the best medicine for you right now.',
        zh: '今天特别注意心理健康很重要。就像风被阻挡时空气变得浑浊，今天找到发泄而不是积累压力的方法。短暂散步或轻松对话现在对你是最好的药。',
        ja: '精神的な健康に気を配ることが今日は特に重要です。風が遮られると空気が濁るように、ストレスを溜め込まずに今日は発散する方法を見つけてください。短い散歩や軽い会話が今のあなたには最も良い薬です。',
        es: 'Prestar atención a la salud mental es especialmente importante hoy. Al igual que el aire se vuelve viciado cuando el viento está bloqueado, encuentra una manera de liberar en lugar de acumular estrés hoy. Un paseo corto o una conversación ligera es la mejor medicina para ti ahora mismo.',
      },
      {
        ko: '가벼운 야외 활동이 기분을 밝게 바꿔주는 날입니다. 바람이 부는 곳에 나가면 오늘의 답답함이 자연스럽게 해소됩니다. 자연 속의 공기를 마시는 것만으로도 충분한 회복이 됩니다.',
        en: 'Light outdoor activities brighten your mood today. Going out where the wind blows naturally relieves today\'s stuffiness. Simply breathing the air in nature provides sufficient recovery.',
        zh: '今天轻松的户外活动让心情明亮起来。出去到有风的地方，今天的憋闷自然消散。仅仅呼吸自然中的空气就能充分恢复。',
        ja: '軽い屋外活動が気分を明るく変えてくれる日です。風が吹く場所に出ると、今日の息苦しさが自然に解消されます。自然の中の空気を吸うだけでも十分な回復になります。',
        es: 'Las actividades ligeras al aire libre alegran tu estado de ánimo hoy. Salir donde sopla el viento alivia naturalmente el agobio de hoy. Simplemente respirar el aire en la naturaleza proporciona recuperación suficiente.',
      },
      {
        ko: '충분한 수면이 두뇌 활동을 최적화하는 날입니다. 바람이 잠잠해야 공기가 맑아지듯, 뇌도 충분히 쉬어야 최고의 성능을 발휘합니다. 오늘 수면 시간을 충분히 확보하는 것이 내일의 생산성을 두 배로 만듭니다.',
        en: 'Sufficient sleep optimizes brain activity today. Just as air becomes clearest when the wind is calm, the brain performs at its best only after sufficient rest. Securing enough sleep tonight doubles tomorrow\'s productivity.',
        zh: '今天充足的睡眠优化大脑活动。就像风平息后空气变清，大脑也需要充分休息才能发挥最佳性能。今天确保充足的睡眠时间会让明天的生产力翻倍。',
        ja: '十分な睡眠が脳の活動を最適化する日です。風が静まると空気が澄むように、脳も十分に休まなければ最高のパフォーマンスを発揮できません。今日の睡眠時間を十分に確保することが明日の生産性を二倍にします。',
        es: 'El sueño suficiente optimiza la actividad cerebral hoy. Al igual que el aire se vuelve más claro cuando el viento está en calma, el cerebro funciona en su mejor momento solo después del descanso suficiente. Asegurar suficiente sueño esta noche duplica la productividad de mañana.',
      },
    ],
    low: [
      {
        ko: '과도한 정보 섭취가 피로를 주는 날입니다. 바람이 너무 강하면 오히려 숨쉬기가 힘들어지듯, 쏟아지는 정보들을 잠시 멈추고 디지털 디톡스를 해보세요. 조용한 시간이 오늘 당신의 뇌를 회복시키는 가장 좋은 방법입니다.',
        en: 'Excessive information intake brings fatigue today. Just as breathing becomes difficult when wind is too strong, pause the flood of information and try a digital detox. Quiet time is the best way to restore your brain today.',
        zh: '今天过多的信息摄入带来疲劳。就像风太强反而难以呼吸，暂停涌来的信息流，尝试数字排毒。安静的时间是今天恢复大脑的最好方法。',
        ja: '過度な情報摂取が疲労を与える日です。風が強すぎるとかえって息苦しくなるように、押し寄せる情報を少し止めてデジタルデトックスをしてみてください。静かな時間が今日のあなたの脳を回復させる最善の方法です。',
        es: 'El consumo excesivo de información trae fatiga hoy. Al igual que respirar se vuelve difícil cuando el viento es demasiado fuerte, pausa la avalancha de información y prueba una desintoxicación digital. El tiempo tranquilo es la mejor manera de restaurar tu cerebro hoy.',
      },
      {
        ko: '불안한 생각이 맴도는 날입니다. 바람 소리처럼 머릿속을 떠도는 생각들을 잡으려 하지 말고, 깊은 호흡으로 그것들이 지나가게 두세요. 생각은 구름처럼 흘러갑니다—당신은 그 구름이 아니라 하늘입니다.',
        en: 'Anxious thoughts are circling today. Instead of trying to catch the thoughts drifting through your mind like wind sounds, let them pass with deep breathing. Thoughts flow like clouds—you are not the clouds but the sky.',
        zh: '今天焦虑的想法在心头萦绕。不要试图抓住像风声一样飘荡在脑海中的想法，用深呼吸让它们过去。想法像云一样流过——你不是那些云，而是天空。',
        ja: '不安な考えが漂う日です。頭の中を風の音のように漂う考えを捕まえようとせず、深い呼吸でそれらが過ぎ去るままにしてください。考えは雲のように流れます—あなたはその雲ではなく空です。',
        es: 'Los pensamientos ansiosos están circulando hoy. En lugar de tratar de atrapar los pensamientos que flotan por tu mente como sonidos de viento, déjalos pasar con respiración profunda. Los pensamientos fluyen como nubes—tú no eres las nubes sino el cielo.',
      },
      {
        ko: '머리를 쉬게 해야 하는 날입니다. 바람도 멈출 때 가장 맑은 공기가 자리를 잡듯, 생각을 멈추고 단순한 것을 즐기는 시간이 필요합니다. 오늘은 복잡한 것에서 벗어나 가장 단순한 즐거움을 찾아보세요.',
        en: 'Today is a day to rest your mind. Just as the clearest air settles when the wind stops, time to stop thinking and enjoy simple things is needed. Today step away from complexity and find the simplest pleasures.',
        zh: '今天需要让大脑休息。就像风停时最清澈的空气落定，需要停止思考享受简单事物的时间。今天远离复杂的事物，寻找最简单的乐趣。',
        ja: '頭を休ませるべき日です。風も止まる時に最も澄んだ空気が落ち着くように、考えるのを止めて単純なことを楽しむ時間が必要です。今日は複雑なことから離れて、最も単純な楽しみを見つけてみてください。',
        es: 'Hoy es un día para descansar tu mente. Al igual que el aire más claro se asienta cuando el viento se detiene, se necesita tiempo para dejar de pensar y disfrutar cosas simples. Hoy aléjate de la complejidad y encuentra los placeres más simples.',
      },
    ],
  },
  money: {
    high: [
      {
        ko: '정보력이 재테크의 핵심인 날입니다. 바람처럼 빠르게 정보를 포착하고 트렌드를 읽는 당신의 능력이 오늘 재정적 기회를 만들어냅니다. 지금 보이는 기회를 분석하고 빠르게 움직이세요.',
        en: 'Information power is the key to investment today. Your ability to capture information as quickly as wind and read trends is creating financial opportunities today. Analyze the opportunities you see now and move quickly.',
        zh: '今天信息能力是理财的关键。你像风一样快速捕捉信息和读懂趋势的能力今天创造了财务机会。分析你现在看到的机会，迅速行动。',
        ja: '情報力が資産運用の重要事項となる日です。風のように素早く情報を掴み、トレンドを読むあなたの能力が今日、財政的な機会を作り出しています。今見えている機会を分析し、素早く動いてください。',
        es: 'El poder de información es la clave para invertir hoy. Tu capacidad para capturar información tan rápidamente como el viento y leer tendencias está creando oportunidades financieras hoy. Analiza las oportunidades que ves ahora y muévete rápidamente.',
      },
      {
        ko: '다양한 수입원을 개발할 수 있는 시기입니다. 바람이 여러 방향으로 불듯, 당신의 다양한 능력이 여러 경로를 통해 수입으로 이어질 수 있습니다. 지금 가진 지식과 네트워크를 재정적 기회로 연결하는 방법을 탐색해보세요.',
        en: 'This is a time when you can develop various income sources. Just as wind blows in many directions, your diverse abilities can lead to income through multiple channels. Explore ways to connect your current knowledge and network into financial opportunities.',
        zh: '这是可以开发多种收入来源的时期。就像风向多个方向吹，你的多种能力可以通过多条渠道带来收入。探索将你现有的知识和人脉连接到财务机会的方法。',
        ja: '様々な収入源を開発できる時期です。風が複数の方向に吹くように、あなたの多様な能力が複数の経路を通じて収入につながることができます。今持っている知識とネットワークを財政的な機会につなげる方法を探索してみてください。',
        es: 'Este es un momento en que puedes desarrollar varias fuentes de ingresos. Al igual que el viento sopla en muchas direcciones, tus diversas habilidades pueden conducir a ingresos a través de múltiples canales. Explora formas de conectar tu conocimiento actual y tu red en oportunidades financieras.',
      },
      {
        ko: '네트워크가 재정적 기회를 가져오는 날입니다. 오늘 나누는 대화 하나가 예상치 못한 수익 창출로 이어질 수 있습니다. 연결을 두려워하지 말고 적극적으로 소통하세요—오늘 당신의 가장 큰 자산은 사람입니다.',
        en: 'Your network brings financial opportunities today. A single conversation today can lead to unexpected income creation. Do not fear connection—communicate actively. Today your greatest asset is people.',
        zh: '今天你的人脉带来财务机会。今天进行的一次对话可能带来意想不到的创收。不要害怕连接，积极沟通——今天你最大的资产是人。',
        ja: 'ネットワークが財政的な機会をもたらす日です。今日交わす会話一つが、予想外の収益創出につながる可能性があります。つながることを恐れず積極的にコミュニケーションしてください—今日のあなたの最大の資産は人です。',
        es: 'Tu red trae oportunidades financieras hoy. Una sola conversación hoy puede conducir a una creación de ingresos inesperada. No temas la conexión—comunícate activamente. Hoy tu mayor activo son las personas.',
      },
    ],
    medium: [
      {
        ko: '재정 상황을 분석하고 계획을 세우는 날입니다. 바람의 방향을 읽는 것처럼, 재정의 흐름을 파악하면 어디에 기회가 있는지 보이기 시작합니다. 오늘 간단한 재정 점검을 통해 다음 단계를 명확히 하세요.',
        en: 'Today is for analyzing your financial situation and making a plan. Just as reading the direction of the wind reveals opportunities, understanding financial flow shows you where opportunities lie. Clarify your next step through a simple financial check today.',
        zh: '今天是分析财务状况并制定计划的日子。就像读懂风向，了解财务流向会让你开始看到哪里有机会。今天通过简单的财务检查明确下一步。',
        ja: '財政状況を分析して計画を立てる日です。風の方向を読むように、財政の流れを把握するとどこにチャンスがあるかが見え始めます。今日、簡単な財政点検を通じて次のステップを明確にしてください。',
        es: 'Hoy es para analizar tu situación financiera y hacer un plan. Al igual que leer la dirección del viento revela oportunidades, entender el flujo financiero te muestra dónde se encuentran las oportunidades. Clarifica tu próximo paso a través de una revisión financiera simple hoy.',
      },
      {
        ko: '다양한 옵션을 비교하는 것이 오늘의 강점입니다. 바람이 여러 길을 시험하듯, 지금 최선의 선택을 위해 여러 가능성을 탐색해보세요. 정보를 충분히 모은 후 움직이는 것이 오늘의 현명한 전략입니다.',
        en: 'Comparing various options is your strength today. Just as wind tests many paths, explore multiple possibilities for the best choice right now. Gathering sufficient information before moving is the wise strategy today.',
        zh: '今天比较各种选择是你的优势。就像风测试多条路径，为了现在最好的选择探索多种可能性。在行动前收集足够信息是今天明智的策略。',
        ja: '様々なオプションを比較することが今日の強みです。風が複数の道を試すように、今最善の選択のために複数の可能性を探索してみてください。十分に情報を集めてから動くことが今日の賢明な戦略です。',
        es: 'Comparar varias opciones es tu fortaleza hoy. Al igual que el viento prueba muchos caminos, explora múltiples posibilidades para la mejor elección ahora mismo. Reunir información suficiente antes de moverse es la estrategia sabia hoy.',
      },
      {
        ko: '지출 내역을 기록하는 것이 재정 관리의 첫 걸음입니다. 바람의 흐름을 추적하면 날씨를 예측하듯, 소비 패턴을 기록하면 재정적 미래를 더 잘 볼 수 있게 됩니다. 오늘부터 작은 지출도 빠짐없이 기록해보세요.',
        en: 'Recording your expenses is the first step of financial management. Just as tracking wind flow allows weather prediction, recording spending patterns lets you see your financial future more clearly. Starting today, record every expense no matter how small.',
        zh: '记录支出是财务管理的第一步。就像追踪风的流向可以预测天气，记录消费模式让你更清楚地看到财务未来。从今天开始，不遗漏地记录每一笔支出。',
        ja: '支出内訳を記録することが財務管理の第一歩です。風の流れを追跡すれば天気を予測するように、消費パターンを記録すると財政的な未来がより見えるようになります。今日から小さな支出も欠かさず記録してみてください。',
        es: 'Registrar tus gastos es el primer paso de la gestión financiera. Al igual que rastrear el flujo de viento permite predecir el tiempo, registrar los patrones de gasto te permite ver tu futuro financiero más claramente. A partir de hoy, registra cada gasto sin importar cuán pequeño sea.',
      },
    ],
    low: [
      {
        ko: '충동적인 지출에 주의해야 하는 날입니다. 바람처럼 빠르게 결정하는 것이 당신의 본성이지만, 오늘 재정적 결정은 잠깐 멈추고 한 번 더 생각해보세요. 그 짧은 멈춤이 나중의 큰 후회를 막아줍니다.',
        en: 'Today is a day to watch out for impulsive spending. Making quick decisions like the wind is your nature, but pause briefly before financial decisions today and think once more. That short pause prevents great regret later.',
        zh: '今天要注意冲动消费。像风一样快速决定是你的本性，但今天在财务决定前短暂停下来再想一想。那短暂的停顿能防止以后的大后悔。',
        ja: '衝動的な支出に注意すべき日です。風のように素早く決定することがあなたの本性ですが、今日の財政的な決定は少し立ち止まってもう一度考えてみてください。その短い停止が後の大きな後悔を防いでくれます。',
        es: 'Hoy es un día para vigilar el gasto impulsivo. Tomar decisiones rápidas como el viento es tu naturaleza, pero haz una pausa breve antes de las decisiones financieras hoy y piensa una vez más. Esa breve pausa previene un gran arrepentimiento posterior.',
      },
      {
        ko: '불확실한 정보에 기반한 투자는 오늘 피하세요. 바람의 방향이 불분명할 때는 나아가지 않는 것이 현명하듯, 확실하지 않은 정보로 큰 결정을 내리는 것은 위험합니다. 오늘은 더 명확한 정보를 기다리는 것이 최선입니다.',
        en: 'Avoid investments based on uncertain information today. Just as it is wise not to advance when wind direction is unclear, making big decisions with uncertain information is risky. Waiting for clearer information is the best option today.',
        zh: '今天避免基于不确定信息的投资。就像风向不明时不前进是明智的，用不确定的信息做重大决定是危险的。今天等待更清晰的信息是最好的选择。',
        ja: '不確実な情報に基づいた投資は今日避けてください。風の方向が不明な時は進まないことが賢明なように、確かでない情報で大きな決断を下すことは危険です。今日はより明確な情報を待つことが最善です。',
        es: 'Evita inversiones basadas en información incierta hoy. Al igual que es sabio no avanzar cuando la dirección del viento es poco clara, tomar grandes decisiones con información incierta es arriesgado. Hoy, esperar información más clara es la mejor opción.',
      },
      {
        ko: '금전 거래에서 신뢰를 지키는 것이 오늘 특히 중요합니다. 바람은 보이지 않지만 그 영향은 모두가 느끼듯, 당신의 재정적 신뢰도도 눈에 보이지 않게 쌓이고 있습니다. 약속한 금전 거래는 오늘 반드시 지키세요.',
        en: 'Maintaining trust in financial transactions is especially important today. Just as wind is invisible but its effects are felt by everyone, your financial trustworthiness is also building invisibly. Keep any promised financial transactions without fail today.',
        zh: '今天在金钱交易中维护信任尤为重要。就像风看不见但其影响人人都感受得到，你的财务信誉也在无形中积累。今天务必遵守承诺的金钱交易。',
        ja: '金銭取引での信頼を守ることが今日は特に重要です。風は見えませんがその影響は誰もが感じるように、あなたの財政的な信頼度も目に見えないところで積み重なっています。約束した金銭取引は今日必ず守ってください。',
        es: 'Mantener la confianza en las transacciones financieras es especialmente importante hoy. Al igual que el viento es invisible pero sus efectos los sienten todos, tu confiabilidad financiera también se está construyendo invisiblemente. Cumple cualquier transacción financiera prometida sin falta hoy.',
      },
    ],
  },
};

// Water (물) - 게자리, 전갈자리, 물고기자리
const waterTemplates: ElementTemplates = {
  overall: {
    high: [
      {
        ko: '직관이 뛰어나게 작동하는 날입니다. 물이 낮은 곳을 자연스럽게 찾아가듯, 당신의 내면은 오늘 어느 방향이 옳은지 이미 알고 있습니다. 그 내면의 소리에 귀 기울이세요—오늘 당신의 직감은 어떤 분석보다 정확합니다.',
        en: 'Your intuition is working brilliantly today. Just as water naturally finds lower ground, your inner self already knows which direction is right today. Listen to that inner voice—your instinct today is more accurate than any analysis.',
        zh: '今天直觉运作得极为出色。就像水自然地流向低处，你的内心今天已经知道哪个方向是对的。倾听那内心的声音——今天你的直觉比任何分析都准确。',
        ja: '直感が卓越して働く日です。水が自然に低いところを見つけていくように、あなたの内面は今日どの方向が正しいかをすでに知っています。その内なる声に耳を傾けてください—今日のあなたの直感はどんな分析よりも正確です。',
        es: 'Tu intuición está funcionando brillantemente hoy. Al igual que el agua encuentra naturalmente el terreno más bajo, tu ser interior ya sabe qué dirección es correcta hoy. Escucha esa voz interior—tu instinto hoy es más preciso que cualquier análisis.',
      },
      {
        ko: '감정의 흐름이 좋은 방향으로 당신을 이끄는 날입니다. 물결처럼 부드럽게 흐르는 오늘의 감정을 신뢰하세요. 억지로 방향을 만들려 하지 않아도, 당신은 이미 좋은 곳으로 향하고 있습니다.',
        en: 'The flow of emotions is leading you in a good direction today. Trust today\'s emotions as they flow gently like waves. Even without forcing a direction, you are already heading somewhere good.',
        zh: '今天情感的流动正在引导你走向好的方向。相信今天像水波般温柔流动的情感。即使不强行创造方向，你也已经在朝着好的地方前进。',
        ja: '感情の流れが良い方向にあなたを導く日です。波紋のように穏やかに流れる今日の感情を信頼してください。無理に方向を作ろうとしなくても、あなたはすでに良い場所へ向かっています。',
        es: 'El flujo de emociones te está llevando en una buena dirección hoy. Confía en las emociones de hoy mientras fluyen suavemente como olas. Incluso sin forzar una dirección, ya te estás dirigiendo hacia algún lugar bueno.',
      },
      {
        ko: '공감 능력이 최고조에 달한 날입니다. 당신은 오늘 상대방이 말하지 않는 것까지 느낄 수 있으며, 그 깊은 이해가 모든 관계를 더욱 깊고 의미 있게 만들어줍니다. 당신의 감성은 오늘 가장 강력한 연결의 도구입니다.',
        en: 'Your empathy has reached its peak today. You can sense what others are not saying today, and that deep understanding makes every relationship deeper and more meaningful. Your emotional sensitivity is today\'s most powerful tool for connection.',
        zh: '今天共情能力达到最高点。今天你能感受到对方未说出口的事，那深刻的理解让所有关系更深更有意义。你的感性今天是最强大的连接工具。',
        ja: '共感能力が最高潮に達した日です。あなたは今日、相手が言葉にしていないことまで感じることができ、その深い理解がすべての関係をより深く意味のあるものにしてくれます。あなたの感性は今日、最も強力なつながりのツールです。',
        es: 'Tu empatía ha alcanzado su punto máximo hoy. Puedes sentir lo que otros no están diciendo hoy, y esa profunda comprensión hace que cada relación sea más profunda y significativa. Tu sensibilidad emocional es la herramienta de conexión más poderosa de hoy.',
      },
    ],
    medium: [
      {
        ko: '감정의 파도를 잘 타면 평온한 하루가 됩니다. 물결은 거스르려 할수록 더 힘들어지지만, 흐름에 몸을 맡기면 자연스럽게 원하는 곳으로 가게 됩니다. 오늘은 저항하지 말고 흐름을 따라가세요.',
        en: 'Riding the emotional waves well makes for a peaceful day. The more you try to resist the current, the harder it becomes, but entrusting yourself to the flow naturally takes you where you want to go. Today, go with the flow rather than resist.',
        zh: '顺应情感的波浪会让今天平静。越是想抗拒水流越是困难，但把自己托付给流动，自然就会到达想去的地方。今天不要抗拒，顺流而行。',
        ja: '感情の波をうまく乗りこなせば穏やかな一日になります。流れに逆らおうとするほど難しくなりますが、流れに身を任せると自然に望む場所へ行けます。今日は抵抗せず、流れに乗ってください。',
        es: 'Montar bien las olas emocionales hace que sea un día tranquilo. Cuanto más intentas resistir la corriente, más difícil se vuelve, pero encomendarte al flujo te lleva naturalmente a donde quieres ir. Hoy, ve con la corriente en lugar de resistir.',
      },
      {
        ko: '조용한 시간이 내면의 치유와 충전을 가져다 주는 날입니다. 물이 고요할 때 가장 맑게 빛나듯, 당신도 잠시 고요한 시간을 가질 때 더 선명하게 자신을 볼 수 있습니다. 오늘 혼자만의 시간을 조금 만들어보세요.',
        en: 'Quiet time brings inner healing and recharging today. Just as water shines most clearly when it is still, you can see yourself most clearly when you have a moment of quiet. Find a little time for yourself alone today.',
        zh: '今天安静的时间带来内心的治愈和充电。就像水在平静时最清澈地发光，你在有一刻安静时也能最清晰地看清自己。今天为自己找一些独处的时间。',
        ja: '静かな時間が内面の癒しと充電をもたらす日です。水が静かな時に最も澄んで輝くように、あなたも少し静かな時間を持つ時により鮮明に自分を見ることができます。今日は一人の時間を少し作ってみてください。',
        es: 'El tiempo tranquilo trae sanación interior y recarga hoy. Al igual que el agua brilla más claramente cuando está quieta, también puedes verte más claramente cuando tienes un momento de quietud. Encuentra un poco de tiempo para ti solo hoy.',
      },
      {
        ko: '예술이나 음악이 오늘 영감을 주는 통로가 됩니다. 물처럼 형태를 바꾸며 아름다운 것을 만드는 당신의 감성이 오늘 예술적인 것에서 깊은 울림을 얻을 것입니다. 아름다운 무언가를 오늘 가까이 두세요.',
        en: 'Art or music becomes a channel for inspiration today. Your sensitivity that creates beautiful things by changing form like water will receive deep resonance from something artistic today. Keep something beautiful close to you today.',
        zh: '今天艺术或音乐成为灵感的通道。像水一样改变形态创造美丽事物的你的感性，今天会从艺术性的事物中获得深刻的共鸣。今天把美丽的东西放在身边。',
        ja: '芸術や音楽が今日インスピレーションを与える通路となります。水のように形を変えて美しいものを作るあなたの感性が、今日は芸術的なものから深い響きを得るでしょう。美しい何かを今日近くに置いてください。',
        es: 'El arte o la música se convierte en un canal de inspiración hoy. Tu sensibilidad que crea cosas bellas cambiando de forma como el agua recibirá profunda resonancia de algo artístico hoy. Mantén algo hermoso cerca de ti hoy.',
      },
    ],
    low: [
      {
        ko: '감정에 휩쓸리지 않도록 주의가 필요한 날입니다. 물이 거센 파도를 만날 때처럼, 오늘은 객관적인 시선을 유지하는 것이 중요합니다. 잠시 멈추고 감정이 아닌 사실에 집중해보면 훨씬 명확한 길이 보입니다.',
        en: 'Care is needed not to be swept away by emotions today. Like water meeting a fierce wave, maintaining an objective view is important today. Pausing for a moment and focusing on facts rather than feelings reveals a much clearer path.',
        zh: '今天需要注意不要被情绪冲昏。就像水遇到汹涌的波浪，今天保持客观的视角很重要。短暂停下，专注于事实而非感受，会看到更清晰的道路。',
        ja: '感情に流されないように注意が必要な日です。水が荒波にぶつかる時のように、今日は客観的な視点を保つことが重要です。少し立ち止まって感情ではなく事実に集中すると、ずっと明確な道が見えてきます。',
        es: 'Se necesita cuidado para no ser arrastrado por las emociones hoy. Como el agua encontrando una ola feroz, mantener una vista objetiva es importante hoy. Hacer una pausa y enfocarse en hechos en lugar de sentimientos revela un camino mucho más claro.',
      },
      {
        ko: '우울한 기분이 찾아올 수 있는 날입니다. 물도 겨울에는 얼어붙듯, 감정도 가끔은 막히는 날이 있습니다. 억지로 밝아지려 하지 말고, 자연스럽게 흘러가도록 두세요. 이 감정도 곧 녹아 흐를 것입니다.',
        en: 'A low mood may arrive today. Just as water freezes in winter, emotions sometimes have days of being blocked. Do not try to force brightness—let it flow naturally. These feelings will melt and flow again soon.',
        zh: '今天可能会有忧郁的心情到来。就像水在冬天会结冰，情感有时也有被堵塞的日子。不要勉强让自己振奋，让它自然地流淌。这份情感很快也会融化流动。',
        ja: '憂鬱な気分が訪れる可能性がある日です。水も冬には凍るように、感情も時には詰まる日があります。無理に明るくなろうとせず、自然に流れるままにしてください。この感情もやがて溶けて流れるでしょう。',
        es: 'Puede llegar un estado de ánimo bajo hoy. Al igual que el agua se congela en invierno, las emociones a veces tienen días de estar bloqueadas. No intentes forzar la alegría—déjalo fluir naturalmente. Estos sentimientos se derretirán y volverán a fluir pronto.',
      },
      {
        ko: '현실과 환상을 구분하는 것이 오늘 특히 중요합니다. 물이 모든 것을 반영하듯, 당신의 감성도 때로는 현실을 아름답게 왜곡합니다. 오늘은 원하는 것보다 실제로 있는 것에 집중하면 훨씬 더 건강한 하루가 됩니다.',
        en: 'Distinguishing between reality and fantasy is especially important today. Just as water reflects everything, your sensitivity sometimes beautifully distorts reality. Today, focusing on what actually exists rather than what you want makes for a much healthier day.',
        zh: '今天区分现实与幻想尤为重要。就像水反映一切，你的感性有时也会美化地扭曲现实。今天专注于实际存在的而非你想要的，会有更健康的一天。',
        ja: '現実と幻想を区別することが今日は特に重要です。水がすべてを映し出すように、あなたの感性も時には現実を美しく歪めます。今日は望むものよりも実際にあるものに集中すると、ずっと健康的な一日になります。',
        es: 'Distinguir entre realidad y fantasía es especialmente importante hoy. Al igual que el agua refleja todo, tu sensibilidad a veces distorsiona beautifully la realidad. Hoy, enfocarte en lo que realmente existe en lugar de lo que quieres hace que sea un día mucho más saludable.',
      },
    ],
  },
  love: {
    high: [
      {
        ko: '깊은 감정적 교감이 이루어지는 날입니다. 물결이 두 해안을 연결하듯, 오늘 당신과 상대방의 마음은 깊은 수준에서 맞닿아 있습니다. 진심을 아끼지 말고 나누세요—오늘의 솔직함이 두 사람을 더욱 깊이 연결시킵니다.',
        en: 'A day of deep emotional connection. Just as waves connect two shores, your heart and your partner\'s touch at a deep level today. Share your true feelings generously—today\'s honesty connects you both more deeply.',
        zh: '今天是深层情感交流的日子。就像水波连接两岸，今天你和对方的心在深层次上相触。慷慨地分享真心——今天的坦诚让两人连接得更深。',
        ja: '深い感情的な交感が成り立つ日です。波紋が二つの岸を結ぶように、今日のあなたと相手の心は深いレベルで触れ合っています。真心を惜しまずに分かち合ってください—今日の率直さが二人をより深くつなげます。',
        es: 'Un día de conexión emocional profunda. Al igual que las olas conectan dos orillas, tu corazón y el de tu pareja se tocan a un nivel profundo hoy. Comparte tus verdaderos sentimientos generosamente—la honestidad de hoy los conecta a ambos más profundamente.',
      },
      {
        ko: '영혼의 단짝을 만날 수 있는 기운이 강한 날입니다. 물이 마침내 바다를 찾듯, 오늘은 진정한 연결을 향한 당신의 여정이 새로운 장에 접어들 수 있습니다. 마음을 열고 있으세요—가장 깊은 연결은 당신이 완전히 자신을 드러낼 때 찾아옵니다.',
        en: 'The energy for meeting a soulmate is strong today. Just as water finally finds the sea, today your journey toward true connection may enter a new chapter. Stay open—the deepest connection comes when you fully reveal yourself.',
        zh: '今天遇见灵魂伴侣的能量很强。就像水最终找到大海，今天你走向真正连接的旅程可能进入新的篇章。保持开放——最深的连接在你完全展现自己时到来。',
        ja: '魂の伴侶に出会える気が強い日です。水がついに海を見つけるように、今日は真のつながりに向けたあなたの旅が新たな章に入る可能性があります。心を開いていてください—最も深いつながりはあなたが完全に自分をさらけ出す時に訪れます。',
        es: 'La energía para conocer a un alma gemela es fuerte hoy. Al igual que el agua finalmente encuentra el mar, hoy tu viaje hacia la verdadera conexión puede entrar en un nuevo capítulo. Permanece abierto—la conexión más profunda llega cuando te revelas completamente.',
      },
      {
        ko: '사랑하는 사람과의 유대감이 더욱 강해지는 날입니다. 함께 나누는 침묵도 말이 되고, 눈빛 하나도 깊은 이해가 됩니다. 오늘은 특별한 무언가를 하려 하지 않아도—그저 함께 있는 것만으로도 충분합니다.',
        en: 'The bond with your loved one grows stronger today. Shared silence becomes language, and a single glance becomes deep understanding. Today you do not need to do anything special—simply being together is enough.',
        zh: '今天与爱人的联系更加牢固。共享的沉默也成为语言，一个眼神也成为深刻的理解。今天不需要做什么特别的——只是在一起就已经足够。',
        ja: '愛する人との絆がさらに強くなる日です。共有する沈黙も言葉になり、ひとつの眼差しも深い理解になります。今日は特別な何かをしようとしなくても—ただ一緒にいるだけで十分です。',
        es: 'El vínculo con tu ser querido crece más fuerte hoy. El silencio compartido se convierte en lenguaje, y una sola mirada se convierte en profunda comprensión. Hoy no necesitas hacer nada especial—simplemente estar juntos es suficiente.',
      },
    ],
    medium: [
      {
        ko: '상대방의 감정을 이해하려는 노력이 관계를 더 깊게 만드는 날입니다. 물이 모든 그릇의 모양을 받아들이듯, 오늘은 상대방의 감정을 있는 그대로 수용하려고 노력해보세요. 그 이해가 두 사람 사이의 가장 깊은 다리가 됩니다.',
        en: 'Efforts to understand your partner\'s emotions deepen the relationship today. Just as water accepts the shape of every vessel, try today to accept your partner\'s emotions just as they are. That understanding becomes the deepest bridge between you.',
        zh: '今天努力理解对方的情感使关系更深。就像水接受每个容器的形状，今天试着如实接受对方的情感。那种理解成为两人之间最深的桥梁。',
        ja: '相手の感情を理解しようとする努力が関係をより深くする日です。水がすべての器の形を受け入れるように、今日は相手の感情をあるがまま受容しようと努力してみてください。その理解が二人の間の最も深い橋となります。',
        es: 'Los esfuerzos para entender las emociones de tu pareja profundizan la relación hoy. Al igual que el agua acepta la forma de cada recipiente, hoy intenta aceptar las emociones de tu pareja tal como son. Esa comprensión se convierte en el puente más profundo entre ustedes.',
      },
      {
        ko: '포용과 이해가 사랑을 치유하고 깊게 하는 날입니다. 상처 입은 부분이 있다면, 오늘 그것을 물처럼 부드럽게 어루만지는 시간을 가져보세요. 가장 깊은 사랑은 완벽함을 요구하지 않고 있는 그대로를 품어줍니다.',
        en: 'Acceptance and understanding heal and deepen love today. If there are wounded parts, take time today to gently tend to them like water. The deepest love does not demand perfection but embraces things as they are.',
        zh: '今天包容和理解治愈并加深爱情。如果有受伤的部分，今天花时间像水一样温柔地抚慰它们。最深的爱不要求完美，而是接纳一切本来的样子。',
        ja: '包容と理解が愛を癒し深める日です。傷ついた部分があるなら、今日それを水のように優しく慰める時間を持ってみてください。最も深い愛は完璧さを求めず、あるがままを包み込みます。',
        es: 'La aceptación y comprensión sanan y profundizan el amor hoy. Si hay partes heridas, tómate el tiempo hoy para atenderlas suavemente como el agua. El amor más profundo no exige perfección sino que abraza las cosas tal como son.',
      },
      {
        ko: '조용하고 로맨틱한 시간이 관계를 새롭게 충전시킵니다. 물이 고요한 곳에서 가장 맑듯, 오늘은 소란함을 멀리하고 둘만의 조용한 순간을 만들어보세요. 그 고요 속에서 두 사람의 진짜 모습이 만날 것입니다.',
        en: 'Quiet and romantic time freshly recharges the relationship. Just as water is clearest in a still place, today move away from noise and create a quiet moment just for the two of you. In that stillness, your true selves will meet.',
        zh: '今天安静浪漫的时光给关系带来新的充电。就像水在宁静处最清澈，今天远离喧嚣，为两人创造安静的时刻。在那份宁静中，两人真实的自我将相遇。',
        ja: '静かでロマンチックな時間が関係を新たに充電させます。水が静かなところで最も澄むように、今日は喧騒を遠ざけて二人だけの静かなひとときを作ってみてください。その静寂の中で二人の本当の姿が出会うでしょう。',
        es: 'El tiempo tranquilo y romántico recarga de nuevo la relación. Al igual que el agua es más clara en un lugar quieto, hoy aléjate del ruido y crea un momento tranquilo solo para los dos. En esa quietud, sus verdaderos yo se encontrarán.',
      },
    ],
    low: [
      {
        ko: '감정적으로 예민해질 수 있는 날입니다. 물이 작은 돌에도 파문을 일으키듯, 오늘은 사소한 것도 크게 느껴질 수 있습니다. 먼저 소통하고 오해가 쌓이기 전에 마음을 나누세요.',
        en: 'You may become emotionally sensitive today. Just as water creates ripples even from small stones, small things may feel large today. Communicate first and share feelings before misunderstandings accumulate.',
        zh: '今天可能会变得情绪敏感。就像水对小石头也会泛起涟漪，今天小事也可能感觉很大。先沟通，在误解积累之前分享心意。',
        ja: '感情的に敏感になる可能性がある日です。水が小さな石でも波紋を起こすように、今日は些細なことも大きく感じられるかもしれません。先にコミュニケーションを取り、誤解が積み重なる前に気持ちを分かち合ってください。',
        es: 'Puedes volverte emocionalmente sensible hoy. Al igual que el agua crea ondas incluso de pequeñas piedras, las cosas pequeñas pueden sentirse grandes hoy. Comunícate primero y comparte sentimientos antes de que los malentendidos se acumulen.',
      },
      {
        ko: '집착이나 의존을 경계해야 하는 날입니다. 물도 막히면 썩듯, 사랑도 집착으로 굳어버리면 흐름을 잃습니다. 상대방을 사랑하는 만큼, 그에게 자유로운 공간을 허락하는 것이 진정한 사랑입니다.',
        en: 'Today is a day to guard against obsession or dependence. Just as blocked water stagnates, love that hardens into obsession loses its flow. Loving your partner means allowing them the freedom of open space—that is genuine love.',
        zh: '今天要警惕执着或依赖。就像水被阻挡会腐臭，爱因执着而僵化也会失去流动。爱对方的同时，给予他自由的空间是真正的爱。',
        ja: '執着や依存を警戒すべき日です。水も塞がれると腐るように、愛も執着で固まってしまうと流れを失います。相手を愛する分、自由な空間を許すことが真の愛です。',
        es: 'Hoy es un día para protegerse de la obsesión o dependencia. Al igual que el agua bloqueada se estanca, el amor que se endurece en obsesión pierde su flujo. Amar a tu pareja significa permitirles el espacio libre de apertura—eso es amor genuino.',
      },
      {
        ko: '과거의 상처가 떠오를 수 있는 날입니다. 물처럼 오래된 것들이 오늘 표면으로 올라올 수 있습니다. 이 감정을 외면하지 말고 부드럽게 바라보세요—치유는 상처를 인정하는 데서 시작됩니다. 오늘 이 과정 자체가 당신을 더 강하게 만들고 있습니다.',
        en: 'Past wounds may resurface today. Like water, old things can rise to the surface today. Do not look away from these feelings—gently observe them. Healing begins with acknowledging the wound. This very process is making you stronger today.',
        zh: '今天过去的伤痛可能浮现。像水一样，旧的事物今天可能浮上表面。不要回避这些情感，温柔地看待它们——治愈从承认伤痛开始。今天这个过程本身正在让你变得更强。',
        ja: '過去の傷が浮かび上がる可能性がある日です。水のように古いものが今日表面に上がってくることがあります。この感情を外面しないで、優しく見つめてください—癒しは傷を認めるところから始まります。今日このプロセス自体があなたをより強くしています。',
        es: 'Las heridas del pasado pueden resurgir hoy. Como el agua, las cosas viejas pueden subir a la superficie hoy. No apartes la vista de estos sentimientos—obsérvalos suavemente. La sanación comienza con reconocer la herida. Este proceso mismo te está haciendo más fuerte hoy.',
      },
    ],
  },
  career: {
    high: [
      {
        ko: '직감이 업무에서 탁월한 결정을 이끄는 날입니다. 물이 최적의 경로를 자연스럽게 찾아가듯, 오늘 당신의 직관이 가장 현명한 업무 방향을 알려줍니다. 데이터와 논리만큼이나 느낌을 신뢰하세요—오늘은 그것이 가장 정확합니다.',
        en: 'Intuition leads to excellent decisions at work today. Just as water naturally finds the optimal path, your intuition today tells you the wisest direction at work. Trust feeling as much as data and logic—today it is the most accurate guide.',
        zh: '今天直觉在工作中引导出色的决策。就像水自然地找到最优路径，今天你的直觉告诉你最明智的工作方向。像信任数据和逻辑一样信任感受——今天它是最准确的向导。',
        ja: '直感が仕事で卓越した決定を導く日です。水が最適な経路を自然に見つけるように、今日のあなたの直感が最も賢明な業務の方向性を教えてくれます。データと論理と同じくらい感覚を信頼してください—今日それが最も正確です。',
        es: 'La intuición conduce a decisiones excelentes en el trabajo hoy. Al igual que el agua encuentra naturalmente el camino óptimo, tu intuición hoy te dice la dirección más sabia en el trabajo. Confía en el sentimiento tanto como en los datos y la lógica—hoy es la guía más precisa.',
      },
      {
        ko: '창의적인 작업에서 영감이 넘쳐나는 날입니다. 물이 모든 공간을 채우듯, 당신의 창의성이 오늘 작업의 모든 부분을 아름답게 채워줍니다. 이 흐름을 가로막지 말고 마음껏 창작에 몰입해보세요.',
        en: 'Inspiration overflows in creative work today. Just as water fills every space, your creativity beautifully fills every part of your work today. Do not block this flow—immerse yourself fully in creation.',
        zh: '今天在创意工作中灵感充沛。就像水填满每个空间，你的创造力今天美丽地填满工作的每个部分。不要阻断这股流动——尽情沉浸在创作中。',
        ja: '創造的な作業でインスピレーションが溢れる日です。水がすべての空間を満たすように、あなたの創造性が今日、仕事のすべての部分を美しく満たしてくれます。この流れを妨げず、思い切り創作に没入してみてください。',
        es: 'La inspiración desborda en el trabajo creativo hoy. Al igual que el agua llena cada espacio, tu creatividad llena beautifully cada parte de tu trabajo hoy. No bloquees este flujo—sumérgete completamente en la creación.',
      },
      {
        ko: '동료들의 마음을 읽는 능력이 뛰어난 날입니다. 물처럼 모든 틈새를 채우는 당신의 공감 능력이 팀 내 갈등을 예방하고 협업을 이끌어냅니다. 오늘 당신은 팀의 가장 중요한 연결 고리입니다.',
        en: 'Your ability to read colleagues\' hearts is exceptional today. Your empathy that fills every gap like water prevents conflicts within the team and leads collaboration. Today you are the most important link in the team.',
        zh: '今天善于读懂同事心思的能力出众。像水填满每个缝隙的你的共情能力，防止团队内的冲突并引导协作。今天你是团队中最重要的连接环节。',
        ja: '同僚の心を読む能力が優れた日です。水のようにすべての隙間を満たすあなたの共感能力が、チーム内の対立を防ぎ、協業を導きます。今日のあなたはチームの最も重要なつなぎ役です。',
        es: 'Tu capacidad para leer los corazones de los colegas es excepcional hoy. Tu empatía que llena cada brecha como el agua previene conflictos dentro del equipo y conduce la colaboración. Hoy eres el eslabón más importante del equipo.',
      },
    ],
    medium: [
      {
        ko: '감정을 업무에서 분리하려고 노력하는 것이 오늘의 핵심 과제입니다. 물이 깊을수록 표면은 잔잔하듯, 깊은 감성을 가지면서도 업무에서는 침착함을 유지하는 것이 오늘 당신의 강점이 됩니다. 내면의 풍부함을 외부의 안정성으로 표현해보세요.',
        en: 'The key task today is trying to separate emotions from work. Just as deeper water has a calmer surface, having deep sensitivity while maintaining composure at work becomes your strength today. Express inner richness as external stability.',
        zh: '今天的核心任务是努力将情绪与工作分开。就像水越深表面越平静，拥有深刻感性同时在工作中保持沉着，成为今天你的优势。把内在的丰富表达为外在的稳定。',
        ja: '感情を仕事から分離しようと努力することが今日の重要な課題です。水は深いほど表面が穏やかなように、深い感性を持ちながらも仕事では落ち着きを維持することが今日のあなたの強みとなります。内面の豊かさを外部の安定性として表現してみてください。',
        es: 'La tarea clave hoy es intentar separar las emociones del trabajo. Al igual que el agua más profunda tiene una superficie más tranquila, tener sensibilidad profunda mientras mantienes la compostura en el trabajo se convierte en tu fortaleza hoy. Expresa la riqueza interior como estabilidad exterior.',
      },
      {
        ko: '팀 내 분위기를 파악하는 것이 업무를 수월하게 만드는 날입니다. 물이 온도 차이를 바로 감지하듯, 당신은 팀 내 긴장이나 에너지의 변화를 빠르게 읽습니다. 이 능력을 활용해 팀의 흐름을 부드럽게 이끌어보세요.',
        en: 'Reading the team atmosphere makes work smoother today. Just as water immediately senses temperature differences, you quickly read changes in tension or energy within the team. Use this ability to guide the team\'s flow smoothly.',
        zh: '今天了解团队氛围让工作更顺畅。就像水立刻感知温度差异，你快速读懂团队内紧张或能量的变化。利用这种能力，顺畅地引导团队的流动。',
        ja: 'チーム内の雰囲気を把握することが業務をスムーズにする日です。水が温度差をすぐに感知するように、あなたはチーム内の緊張やエネルギーの変化を素早く読み取ります。この能力を活かしてチームの流れを滑らかに導いてみてください。',
        es: 'Leer la atmósfera del equipo hace el trabajo más suave hoy. Al igual que el agua detecta inmediatamente las diferencias de temperatura, lees rápidamente los cambios en tensión o energía dentro del equipo. Usa esta capacidad para guiar el flujo del equipo suavemente.',
      },
      {
        ko: '공감 능력이 고객이나 동료와의 관계를 향상시키는 날입니다. 물이 상대방의 형태에 맞게 자신을 조절하듯, 오늘 당신의 유연한 공감이 어떤 사람과도 원활한 관계를 만들어냅니다. 이 자연스러운 적응력이 오늘 당신의 가장 강력한 업무 도구입니다.',
        en: 'Empathy improves relationships with customers or colleagues today. Just as water adjusts itself to the shape of its container, your flexible empathy today creates smooth relationships with anyone. This natural adaptability is your most powerful work tool today.',
        zh: '今天共情能力改善与客户或同事的关系。就像水根据容器的形状调整自身，今天你灵活的共情为与任何人建立顺畅的关系。这种自然的适应性是今天你最强大的工作工具。',
        ja: '共感能力が顧客や同僚との関係を向上させる日です。水が相手の形に合わせて自分を調整するように、今日のあなたの柔軟な共感がどんな人とも円滑な関係を作り出します。この自然な適応力が今日のあなたの最も強力な業務ツールです。',
        es: 'La empatía mejora las relaciones con clientes o colegas hoy. Al igual que el agua se ajusta a la forma de su recipiente, tu empatía flexible hoy crea relaciones fluidas con cualquier persona. Esta adaptabilidad natural es tu herramienta de trabajo más poderosa hoy.',
      },
    ],
    low: [
      {
        ko: '업무 중 감정적인 반응을 자제해야 하는 날입니다. 물이 바위를 만났을 때 흐름을 우회하듯, 오늘은 직접 부딪히기보다 돌아가는 방법을 선택하세요. 유연한 우회가 때로는 가장 빠른 길입니다.',
        en: 'You need to restrain emotional reactions at work today. Just as water diverts its flow when meeting a rock, choose to go around rather than confront directly today. A flexible detour is sometimes the fastest path.',
        zh: '今天工作中需要克制情绪反应。就像水遇到岩石时绕道而行，今天选择绕行而不是直接对抗。灵活的绕行有时是最快的路。',
        ja: '仕事中の感情的な反応を自制しなければならない日です。水が岩に会った時に流れを迂回するように、今日は直接ぶつかるよりも回り道を選んでください。柔軟な迂回が時には最も速い道です。',
        es: 'Necesitas contener las reacciones emocionales en el trabajo hoy. Al igual que el agua desvía su flujo cuando encuentra una roca, hoy elige rodear en lugar de confrontar directamente. Un desvío flexible es a veces el camino más rápido.',
      },
      {
        ko: '비판을 개인적으로 받아들이지 않는 것이 오늘의 핵심입니다. 물이 모든 것을 담지만 그 모든 것에 물들지는 않듯, 피드백을 성장의 도구로 사용하되 그것이 당신 자체를 정의하게 두지 마세요. 오늘 받는 비판이 내일의 성장 연료가 됩니다.',
        en: 'Not taking criticism personally is the key today. Just as water holds everything but is not stained by everything it holds, use feedback as a tool for growth but do not let it define who you are. Today\'s criticism becomes the fuel for tomorrow\'s growth.',
        zh: '今天不把批评当作人身攻击是关键。就像水能容纳一切但不被所容纳的一切染色，把反馈作为成长工具，但不要让它定义你自身。今天收到的批评成为明天成长的燃料。',
        ja: '批判を個人的に受け取らないことが今日の重要事項です。水がすべてを受け入れながらも、すべてに染まらないように、フィードバックを成長のツールとして使いながら、それがあなた自身を定義させないようにしてください。今日受ける批判が明日の成長の燃料になります。',
        es: 'No tomar las críticas personalmente es la clave hoy. Al igual que el agua contiene todo pero no se mancha por todo lo que contiene, usa el feedback como herramienta de crecimiento pero no dejes que defina quién eres. Las críticas de hoy se convierten en el combustible para el crecimiento de mañana.',
      },
      {
        ko: '명확한 경계를 설정하는 것이 오늘 당신을 지키는 방법입니다. 물도 뚝이 없으면 넘쳐 모든 것을 잃듯, 오늘은 번아웃을 막기 위해 "아니오"라고 말하는 용기가 필요합니다. 자신을 지키는 것이 팀을 지키는 것과 같습니다.',
        en: 'Setting clear boundaries is how you protect yourself today. Just as water without a dam overflows and loses everything, the courage to say "no" is needed today to prevent burnout. Protecting yourself is the same as protecting the team.',
        zh: '今天设定明确的界限是保护自己的方式。就像没有堤坝的水会泛滥失去一切，今天需要勇气说"不"来防止倦怠。保护自己和保护团队是一样的。',
        ja: '明確な境界を設定することが今日のあなたを守る方法です。水も堤防がなければ溢れてすべてを失うように、今日はバーンアウトを防ぐために「ノー」と言う勇気が必要です。自分を守ることがチームを守ることと同じです。',
        es: 'Establecer límites claros es cómo te proteges hoy. Al igual que el agua sin un dique se desborda y pierde todo, se necesita el coraje de decir "no" hoy para prevenir el agotamiento. Protegerte a ti mismo es lo mismo que proteger al equipo.',
      },
    ],
  },
  health: {
    high: [
      {
        ko: '정서적 안정이 신체 건강에 긍정적인 영향을 주는 날입니다. 물이 맑을 때 모든 것이 선명하게 보이듯, 오늘 당신의 안정된 감정이 몸 전체를 치유하고 활성화시킵니다. 이 좋은 에너지를 유지하며 오늘 하루를 충분히 누리세요.',
        en: 'Emotional stability positively affects physical health today. Just as everything is seen clearly when water is clear, your stable emotions today are healing and activating your entire body. Maintain this good energy and fully enjoy today.',
        zh: '今天情绪稳定对身体健康有积极影响。就像水清澈时一切都清晰可见，今天你稳定的情感治愈并激活整个身体。保持这股好能量，充分享受今天。',
        ja: '情緒的な安定が身体の健康に良い影響を与える日です。水が澄んでいる時すべてが鮮明に見えるように、今日のあなたの安定した感情が体全体を癒し活性化させます。この良いエネルギーを維持しながら今日一日を十分に楽しんでください。',
        es: 'La estabilidad emocional afecta positivamente la salud física hoy. Al igual que todo se ve claramente cuando el agua está clara, tus emociones estables hoy están sanando y activando todo tu cuerpo. Mantén esta buena energía y disfruta completamente hoy.',
      },
      {
        ko: '물가에서의 활동이 특별한 치유의 힘을 주는 날입니다. 바다, 강, 호수—어디든 물 가까이 가면 오늘 당신의 몸과 마음이 자연스럽게 회복됩니다. 물의 리듬에 자신을 맡겨보세요.',
        en: 'Activities near water give special healing power today. Sea, river, lake—going near any water naturally restores your body and mind today. Entrust yourself to the rhythm of water.',
        zh: '今天在水边的活动给予特殊的治愈力量。大海、河流、湖泊——靠近任何水的地方，今天你的身心都会自然地恢复。把自己托付给水的节奏。',
        ja: '水辺での活動が特別な癒しの力を与える日です。海、川、湖—どこでも水の近くに行けば今日のあなたの体と心が自然に回復します。水のリズムに自分を任せてみてください。',
        es: 'Las actividades cerca del agua dan poder de sanación especial hoy. Mar, río, lago—ir cerca de cualquier agua restaura naturalmente tu cuerpo y mente hoy. Encomiéndate al ritmo del agua.',
      },
      {
        ko: '명상과 휴식이 몸과 마음을 깊이 회복시키는 날입니다. 물이 고요히 흐르며 모든 것을 씻어내듯, 오늘의 명상이 쌓인 피로와 긴장을 부드럽게 흘려보냅니다. 10분이라도 조용히 자신 안으로 들어가는 시간을 만들어보세요.',
        en: 'Meditation and rest deeply restore body and mind today. Just as water flows quietly and washes everything clean, today\'s meditation gently carries away accumulated fatigue and tension. Find even just 10 minutes to enter quietly into yourself.',
        zh: '今天冥想和休息深深恢复身心。就像水静静流淌洗净一切，今天的冥想温柔地带走积累的疲劳和紧张。找到哪怕10分钟的时间，静静地进入自己内心。',
        ja: '瞑想と休息が体と心を深く回復させる日です。水が静かに流れてすべてを洗い流すように、今日の瞑想が積み重なった疲労と緊張を穏やかに流し去ります。10分でもいいので静かに自分の内面に入る時間を作ってみてください。',
        es: 'La meditación y el descanso restauran profundamente cuerpo y mente hoy. Al igual que el agua fluye silenciosamente y limpia todo, la meditación de hoy lleva suavemente la fatiga y tensión acumuladas. Encuentra aunque sean solo 10 minutos para entrar silenciosamente en ti mismo.',
      },
    ],
    medium: [
      {
        ko: '감정 상태가 건강에 직접적인 영향을 주는 날입니다. 물이 탁하면 몸에도 좋지 않듯, 오늘은 부정적인 감정을 빠르게 정화하는 것이 중요합니다. 가벼운 운동이나 좋아하는 음악이 오늘의 감정 정화에 도움이 됩니다.',
        en: 'Your emotional state directly affects health today. Just as turbid water is not good for the body, quickly purifying negative emotions is important today. Light exercise or your favorite music helps purify emotions today.',
        zh: '今天情绪状态直接影响健康。就像水浑浊对身体不好，今天快速净化负面情绪很重要。轻松的运动或喜欢的音乐有助于今天的情感净化。',
        ja: '感情状態が健康に直接影響を与える日です。水が濁ると体にも良くないように、今日はネガティブな感情を素早く浄化することが重要です。軽い運動や好きな音楽が今日の感情の浄化に役立ちます。',
        es: 'Tu estado emocional afecta directamente la salud hoy. Al igual que el agua turbia no es buena para el cuerpo, purificar rápidamente las emociones negativas es importante hoy. El ejercicio ligero o tu música favorita ayuda a purificar emociones hoy.',
      },
      {
        ko: '충분한 수분 섭취가 오늘 특히 중요합니다. 물의 원소와 연결된 당신은 수분이 부족할 때 더 빨리 피로를 느낍니다. 오늘은 의식적으로 물을 자주 마시고, 몸이 원하는 수분을 충분히 공급해주세요.',
        en: 'Sufficient hydration is especially important today. Connected to the water element, you feel fatigue more quickly when dehydrated. Today, consciously drink water frequently and supply the hydration your body needs.',
        zh: '今天充足的水分摄入尤为重要。与水元素连接的你在缺水时更快感到疲劳。今天有意识地经常喝水，充分供给身体需要的水分。',
        ja: '十分な水分摂取が今日は特に重要です。水の元素とつながっているあなたは、水分が不足すると早く疲労を感じます。今日は意識的に水をこまめに飲み、体が求める水分を十分に補給してください。',
        es: 'La hidratación suficiente es especialmente importante hoy. Conectado al elemento agua, sientes la fatiga más rápidamente cuando estás deshidratado. Hoy, bebe agua conscientemente con frecuencia y suministra la hidratación que necesita tu cuerpo.',
      },
      {
        ko: '수영이나 수중 운동이 오늘 특별히 좋은 효과를 줍니다. 물 속에서 움직이는 것이 당신의 본성과 공명하여, 다른 운동보다 훨씬 더 깊은 회복과 활력을 가져다 줄 것입니다. 오늘 물과 가까운 활동을 선택해보세요.',
        en: 'Swimming or water exercises give especially good effects today. Moving in water resonates with your nature and will bring much deeper recovery and vitality than other exercises. Choose an activity close to water today.',
        zh: '今天游泳或水中运动效果特别好。在水中运动与你的本性产生共鸣，会带来比其他运动更深的恢复和活力。今天选择与水相近的活动。',
        ja: '水泳や水中運動が今日は特に良い効果をもたらします。水の中で動くことがあなたの本性と共鳴して、他の運動よりもずっと深い回復と活力をもたらしてくれます。今日は水に近い活動を選んでみてください。',
        es: 'Nadar o hacer ejercicios acuáticos dan efectos especialmente buenos hoy. Moverse en el agua resuena con tu naturaleza y traerá una recuperación y vitalidad mucho más profunda que otros ejercicios. Elige una actividad cercana al agua hoy.',
      },
    ],
    low: [
      {
        ko: '감정적 스트레스가 몸에 영향을 줄 수 있는 날입니다. 물이 오염되면 모든 것에 영향을 미치듯, 마음의 혼탁함이 몸으로 전해지고 있습니다. 오늘은 무엇보다 마음을 편안하게 하는 것이 최고의 건강 관리입니다.',
        en: 'Emotional stress may affect your body today. Just as contaminated water affects everything, the turbulence of the heart is being transmitted to the body. Calming your mind is the best health care above all today.',
        zh: '今天情绪压力可能影响身体。就像水被污染影响一切，心灵的浑浊正在传递到身体。今天让心情平静是最好的健康管理，高于一切。',
        ja: '感情的なストレスが体に影響を与える可能性がある日です。水が汚染されるとすべてに影響を及ぼすように、心の混濁が体に伝わっています。今日は何よりも心を落ち着かせることが最高の健康管理です。',
        es: 'El estrés emocional puede afectar tu cuerpo hoy. Al igual que el agua contaminada afecta todo, la turbulencia del corazón se está transmitiendo al cuerpo. Calmar tu mente es el mejor cuidado de salud por encima de todo hoy.',
      },
      {
        ko: '수면의 질에 주의해야 하는 날입니다. 물이 고요해야 맑은 반영을 보여주듯, 깊은 수면이 내일의 명료함을 만들어줍니다. 잠들기 전 마음을 가라앉히는 의식을 만들어보세요—몸과 마음이 함께 회복됩니다.',
        en: 'Pay attention to sleep quality today. Just as water must be still to show a clear reflection, deep sleep creates tomorrow\'s clarity. Create a calming ritual before sleeping—body and mind recover together.',
        zh: '今天要注意睡眠质量。就像水需要平静才能显示清晰的倒影，深度睡眠创造明天的清晰。睡前创建安抚心灵的仪式——身心一起恢复。',
        ja: '睡眠の質に注意すべき日です。水が静まらなければ澄んだ反映を見せてくれないように、深い睡眠が明日の明晰さを作り出します。眠る前に心を落ち着かせる儀式を作ってみてください—体と心が一緒に回復します。',
        es: 'Presta atención a la calidad del sueño hoy. Al igual que el agua debe estar quieta para mostrar un reflejo claro, el sueño profundo crea la claridad de mañana. Crea un ritual tranquilizador antes de dormir—cuerpo y mente se recuperan juntos.',
      },
      {
        ko: '우울감이 깊어질 수 있는 날입니다. 물이 너무 낮은 곳에 고이면 썩듯, 감정도 너무 오래 가라앉아 있으면 해롭습니다. 혼자 감당하기 어렵다면 가까운 사람에게 터놓거나, 필요하다면 전문가의 도움을 받는 것도 용기 있는 선택입니다.',
        en: 'Feelings of depression may deepen today. Just as water stagnates and spoils when it pools too low, emotions also become harmful when they stay sunken too long. If it is hard to handle alone, open up to someone close, or seeking professional help if needed is also a courageous choice.',
        zh: '今天抑郁感可能加深。就像水积在太低的地方会腐臭，情感沉积太久也有害。如果独自难以承受，向亲近的人倾诉，或者如果需要，寻求专业帮助也是勇敢的选择。',
        ja: '憂鬱感が深まる可能性がある日です。水が低いところに溜まりすぎると腐るように、感情も沈んだままでいすぎると有害になります。一人で抱えることが難しければ、近しい人に打ち明けるか、必要なら専門家の助けを求めることも勇気ある選択です。',
        es: 'Los sentimientos de depresión pueden profundizarse hoy. Al igual que el agua se estanca y se echa a perder cuando se acumula demasiado bajo, las emociones también se vuelven dañinas cuando permanecen hundidas por demasiado tiempo. Si es difícil manejarlo solo, abrirse a alguien cercano, o buscar ayuda profesional si es necesario, también es una elección valiente.',
      },
    ],
  },
  money: {
    high: [
      {
        ko: '직감이 재정적 결정에서 특별히 빛나는 날입니다. 물이 자연스럽게 올바른 방향을 찾듯, 오늘 당신의 재정적 직감이 가장 좋은 기회를 정확하게 가리킵니다. 숫자보다 느낌을 먼저 신뢰해보세요—오늘은 그것이 더 정확합니다.',
        en: 'Intuition especially shines in financial decisions today. Just as water naturally finds the right direction, your financial intuition today precisely points to the best opportunity. Trust feeling before numbers today—it is more accurate.',
        zh: '今天直觉在财务决策中特别闪耀。就像水自然地找到正确的方向，今天你的财务直觉精确地指向最好的机会。今天先信任感受而非数字——它更准确。',
        ja: '直感が財政的な決定で特別に輝く日です。水が自然に正しい方向を見つけるように、今日のあなたの財政的な直感が最も良いチャンスを正確に指し示します。数字より感覚を先に信頼してみてください—今日はそれの方が正確です。',
        es: 'La intuición brilla especialmente en las decisiones financieras hoy. Al igual que el agua encuentra naturalmente la dirección correcta, tu intuición financiera hoy apunta precisamente a la mejor oportunidad. Confía en el sentimiento antes que en los números hoy—es más preciso.',
      },
      {
        ko: '예술이나 창작 활동이 수입으로 이어질 수 있는 시기입니다. 당신의 감성과 창의성이 오늘 재정적 가치를 만들어낼 수 있습니다. 좋아하는 것을 돈으로 연결하는 방법을 탐색해보세요—당신의 감성이 곧 자산입니다.',
        en: 'This is a period when art or creative activities can lead to income. Your sensitivity and creativity can create financial value today. Explore ways to connect what you love to money—your sensitivity is itself an asset.',
        zh: '这是艺术或创作活动可以带来收入的时期。你的感性和创造力今天可以创造财务价值。探索将你喜欢的事物与金钱连接的方式——你的感性就是资产。',
        ja: '芸術や創作活動が収入につながる可能性がある時期です。あなたの感性と創造性が今日、財政的な価値を作り出すことができます。好きなことをお金につなげる方法を探索してみてください—あなたの感性こそが資産です。',
        es: 'Este es un período en que el arte o las actividades creativas pueden conducir a ingresos. Tu sensibilidad y creatividad pueden crear valor financiero hoy. Explora formas de conectar lo que amas con el dinero—tu sensibilidad es en sí misma un activo.',
      },
      {
        ko: '타인을 돕는 활동이 예상치 못한 풍요를 가져오는 날입니다. 물이 낮은 곳으로 흘러 모든 것을 적시듯, 오늘의 관대함이 돌아서 당신에게 더 큰 형태로 돌아옵니다. 나눔이 곧 풍요의 씨앗입니다.',
        en: 'Activities helping others bring unexpected abundance today. Just as water flows to lower places and moistens everything, today\'s generosity will return to you in a greater form. Sharing is the seed of abundance.',
        zh: '今天帮助他人带来意想不到的丰盛。就像水流向低处滋润一切，今天的慷慨会以更大的形式回到你身上。分享就是丰盛的种子。',
        ja: '他人を助ける活動が予想外の豊かさをもたらす日です。水が低いところへ流れてすべてを潤すように、今日の寛大さが巡り巡ってあなたにより大きな形で戻ってきます。分かち合うことがすなわち豊かさの種です。',
        es: 'Las actividades que ayudan a otros traen abundancia inesperada hoy. Al igual que el agua fluye hacia lugares más bajos y humedece todo, la generosidad de hoy te volverá en una forma mayor. Compartir es la semilla de la abundancia.',
      },
    ],
    medium: [
      {
        ko: '감정적으로 지출하는 것을 경계해야 하는 날입니다. 물이 감정에 반응하듯, 당신도 기분에 따라 지갑을 열 수 있습니다. 오늘 구매 전에 잠시 멈추고 "이것이 정말 필요한가, 아니면 지금 감정이 원하는 것인가?"를 물어보세요.',
        en: 'Today is a day to guard against emotional spending. Just as water reacts to emotion, you may open your wallet according to your mood. Before purchasing today, pause and ask "Is this truly needed, or is this what my current emotions want?"',
        zh: '今天要警惕情绪化消费。就像水对情感做出反应，你也可能根据心情打开钱包。今天购买前暂停一下，问问自己"这真的是需要的，还是现在情绪想要的？"',
        ja: '感情的に支出することを警戒すべき日です。水が感情に反応するように、あなたも気分に従って財布を開ける可能性があります。今日は購入前にしばらく立ち止まって「これは本当に必要なのか、それとも今の感情が欲しいものなのか?」と問いかけてください。',
        es: 'Hoy es un día para protegerse contra el gasto emocional. Al igual que el agua reacciona a la emoción, puedes abrir tu billetera según tu estado de ánimo. Antes de comprar hoy, haz una pausa y pregunta "¿Esto realmente se necesita, o es lo que mis emociones actuales quieren?"',
      },
      {
        ko: '재정 상황을 냉정하게 평가하는 것이 오늘의 핵심입니다. 물이 맑아야 바닥이 보이듯, 감정을 걷어내고 현실적인 숫자를 직시하는 것이 지금 필요합니다. 불편한 진실이 보이더라도, 그것을 아는 것이 개선의 첫 걸음입니다.',
        en: 'Evaluating your financial situation calmly is the key today. Just as clear water allows you to see the bottom, removing emotions and facing realistic numbers is what is needed now. Even if uncomfortable truths appear, knowing them is the first step to improvement.',
        zh: '今天冷静评估财务状况是关键。就像水清澈才能看见底部，剔除情感直视现实数字是现在需要的。即使看到不舒服的真相，了解它们是改善的第一步。',
        ja: '財政状況を冷静に評価することが今日の重要事項です。水が澄んでいてこそ底が見えるように、感情を取り払って現実的な数字を直視することが今必要です。不快な真実が見えても、それを知ることが改善の第一歩です。',
        es: 'Evaluar tu situación financiera con calma es la clave hoy. Al igual que el agua clara te permite ver el fondo, eliminar emociones y enfrentar números realistas es lo que se necesita ahora. Incluso si aparecen verdades incómodas, conocerlas es el primer paso para mejorar.',
      },
      {
        ko: '기부나 나눔이 마음의 풍요를 가져오는 날입니다. 물이 순환할 때 깨끗해지듯, 당신의 재물도 흐르게 할 때 더 건강해집니다. 작은 나눔이라도 오늘 실천해보면, 물질보다 훨씬 더 큰 풍요감이 찾아올 것입니다.',
        en: 'Donation or sharing brings richness of heart today. Just as water becomes clean when it circulates, your wealth becomes healthier when it flows. Even a small act of sharing today will bring a sense of abundance far greater than material things.',
        zh: '今天捐赠或分享带来心灵的丰富。就像水循环时变得清洁，你的财富在流动时也变得更健康。今天即使是小小的分享，也会带来远比物质更大的丰盛感。',
        ja: '寄付や分かち合いが心の豊かさをもたらす日です。水が循環する時に清くなるように、あなたの財もいt流れるようにすると、より健康的になります。今日小さな分かち合いでも実践してみると、物質よりずっと大きな豊かさの感覚が訪れるでしょう。',
        es: 'La donación o compartir trae riqueza del corazón hoy. Al igual que el agua se vuelve limpia cuando circula, tu riqueza se vuelve más saludable cuando fluye. Incluso un pequeño acto de compartir hoy traerá una sensación de abundancia mucho mayor que las cosas materiales.',
      },
    ],
    low: [
      {
        ko: '감정적인 상태에서 큰 재정 결정을 피해야 하는 날입니다. 물이 격랑을 만나면 방향을 잃듯, 감정이 흔들릴 때 내린 재정 결정은 나중에 후회할 가능성이 높습니다. 오늘은 감정이 안정될 때까지 큰 결정을 미루세요.',
        en: 'Today is a day to avoid big financial decisions in emotional states. Just as water loses direction when it meets turbulence, financial decisions made when emotions are shaken are likely to bring regret later. Today, delay major decisions until your emotions stabilize.',
        zh: '今天是避免在情绪状态下做重大财务决定的日子。就像水遇到湍流会迷失方向，情绪波动时做的财务决定以后很可能后悔。今天，将重大决定推迟到情绪稳定为止。',
        ja: '感情的な状態で大きな財政決定を避けるべき日です。水が激流に会うと方向を失うように、感情が揺れている時に下した財政決定は後で後悔する可能性が高いです。今日は感情が安定するまで大きな決定を先延ばしてください。',
        es: 'Hoy es un día para evitar grandes decisiones financieras en estados emocionales. Al igual que el agua pierde dirección cuando encuentra turbulencia, las decisiones financieras tomadas cuando las emociones están sacudidas probablemente traigan arrepentimiento después. Hoy, retrasa las decisiones importantes hasta que tus emociones se estabilicen.',
      },
      {
        ko: '타인에게 과도하게 베푸는 것을 조심해야 하는 날입니다. 물도 과도하게 흘러나가면 자신이 말라버리듯, 오늘은 먼저 자신의 재정적 안정을 확인한 후에 나눠주세요. 자신을 채워야 타인도 채울 수 있습니다.',
        en: 'Today is a day to be careful about giving too much to others. Just as water dries up when it flows out excessively, first confirm your own financial stability today before giving. You can only fill others after filling yourself.',
        zh: '今天要小心过度给予他人。就像水过度流出会干涸，今天先确认自己的财务稳定再分享。只有先充实自己，才能充实他人。',
        ja: '他人に過度に与えることに注意すべき日です。水も過度に流れ出ると自分が枯れてしまうように、今日はまず自分の財政的な安定を確認してから分け与えてください。自分を満たしてこそ他人も満たすことができます。',
        es: 'Hoy es un día para tener cuidado de dar demasiado a otros. Al igual que el agua se seca cuando fluye excesivamente, primero confirma tu propia estabilidad financiera hoy antes de dar. Solo puedes llenar a otros después de llenarte a ti mismo.',
      },
      {
        ko: '현실적인 재정 계획이 꿈을 지속 가능하게 만드는 토대입니다. 물도 제방이 있어야 원하는 곳으로 흐르듯, 당신의 풍요로운 꿈도 현실적인 계획이라는 제방이 있어야 이루어질 수 있습니다. 오늘 꿈과 현실 사이의 균형을 찾아보세요.',
        en: 'A realistic financial plan is the foundation that makes dreams sustainable. Just as water needs a dam to flow where it wants, your abundant dreams can only be realized with the dam of realistic planning. Today, find the balance between dreams and reality.',
        zh: '现实的财务计划是让梦想可持续的基础。就像水需要堤坝才能流向想去的地方，你丰盛的梦想也需要现实计划这个堤坝才能实现。今天寻找梦想与现实之间的平衡。',
        ja: '現実的な財政計画が夢を持続可能にする土台です。水も堤防があってこそ望む場所へ流れるように、あなたの豊かな夢も現実的な計画という堤防があってこそ実現できます。今日、夢と現実の間のバランスを見つけてみてください。',
        es: 'Un plan financiero realista es la base que hace los sueños sostenibles. Al igual que el agua necesita un dique para fluir donde quiere, tus sueños abundantes solo pueden realizarse con el dique de la planificación realista. Hoy, encuentra el equilibrio entre sueños y realidad.',
      },
    ],
  },
};

// 원소별 템플릿 통합
export const elementTemplates: Record<Element, ElementTemplates> = {
  fire: fireTemplates,
  earth: earthTemplates,
  air: airTemplates,
  water: waterTemplates,
};

export { fireTemplates, earthTemplates, airTemplates, waterTemplates };
