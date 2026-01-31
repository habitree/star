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
        ko: '오늘은 모든 일이 순조롭게 풀리는 행운의 날입니다. 자신감을 가지고 도전하세요.',
        en: 'Today is a lucky day when everything goes smoothly. Challenge yourself with confidence.',
        zh: '今天是一切顺利的幸运日。带着自信去迎接挑战吧。',
        ja: '今日はすべてがうまくいく幸運な日です。自信を持ってチャレンジしてください。',
        es: 'Hoy es un día de suerte en el que todo sale bien. Desafíate con confianza.',
      },
      {
        ko: '별들이 당신을 축복하고 있습니다. 새로운 기회가 찾아올 것입니다.',
        en: 'The stars are blessing you. New opportunities will come your way.',
        zh: '星星在祝福你。新的机会即将到来。',
        ja: '星々があなたを祝福しています。新しいチャンスが訪れるでしょう。',
        es: 'Las estrellas te están bendiciendo. Nuevas oportunidades vendrán hacia ti.',
      },
      {
        ko: '긍정적인 에너지가 가득한 하루입니다. 주변 사람들에게도 좋은 영향을 줄 수 있습니다.',
        en: 'A day full of positive energy. You can also have a good influence on those around you.',
        zh: '充满积极能量的一天。你也能给周围的人带来好的影响。',
        ja: 'ポジティブなエネルギーに満ちた一日です。周りの人にも良い影響を与えられるでしょう。',
        es: 'Un día lleno de energía positiva. También puedes influir positivamente en quienes te rodean.',
      },
      {
        ko: '오늘 하는 모든 일에서 성공을 거둘 수 있습니다. 용기를 내세요.',
        en: 'You can achieve success in everything you do today. Be brave.',
        zh: '今天做的每件事都能取得成功。勇敢一点吧。',
        ja: '今日行うすべてのことで成功を収めることができます。勇気を持ってください。',
        es: 'Puedes lograr el éxito en todo lo que hagas hoy. Sé valiente.',
      },
      {
        ko: '최고의 운세가 함께합니다. 원하는 것을 이루기에 완벽한 날입니다.',
        en: 'The best fortune is with you. It is a perfect day to achieve what you want.',
        zh: '最好的运势伴随着你。这是实现愿望的完美一天。',
        ja: '最高の運勢があなたと共にあります。望むものを叶えるのに完璧な日です。',
        es: 'La mejor fortuna está contigo. Es un día perfecto para lograr lo que deseas.',
      },
    ],
    medium: [
      {
        ko: '평온한 하루가 될 것입니다. 작은 일에도 감사하는 마음을 가지세요.',
        en: 'It will be a peaceful day. Be grateful for the little things.',
        zh: '这将是平静的一天。对小事也要怀有感恩之心。',
        ja: '穏やかな一日になるでしょう。小さなことにも感謝の気持ちを持ちましょう。',
        es: 'Será un día tranquilo. Agradece las pequeñas cosas.',
      },
      {
        ko: '일상적인 흐름 속에서 소소한 행복을 발견할 수 있는 날입니다.',
        en: 'A day when you can discover small happiness in your daily routine.',
        zh: '可以在日常生活中发现小幸福的一天。',
        ja: '日常の中で小さな幸せを見つけられる日です。',
        es: 'Un día en el que puedes descubrir pequeñas felicidades en tu rutina diaria.',
      },
      {
        ko: '무난하게 흘러가는 하루입니다. 급하게 서두르지 마세요.',
        en: 'A day that flows smoothly. Do not rush.',
        zh: '平稳流淌的一天。不要着急。',
        ja: '無難に流れる一日です。急いで焦らないでください。',
        es: 'Un día que fluye suavemente. No te apresures.',
      },
      {
        ko: '안정적인 에너지가 감싸는 날입니다. 현재에 집중하세요.',
        en: 'A day wrapped in stable energy. Focus on the present.',
        zh: '稳定能量环绕的一天。专注于当下吧。',
        ja: '安定したエネルギーに包まれる日です。現在に集中してください。',
        es: 'Un día envuelto en energía estable. Concéntrate en el presente.',
      },
      {
        ko: '특별한 일은 없지만 편안한 하루가 될 것입니다.',
        en: 'Nothing special, but it will be a comfortable day.',
        zh: '虽然没有特别的事，但会是舒适的一天。',
        ja: '特別なことはありませんが、快適な一日になるでしょう。',
        es: 'Nada especial, pero será un día cómodo.',
      },
    ],
    low: [
      {
        ko: '조금 힘든 하루가 될 수 있습니다. 무리하지 말고 자신을 돌보세요.',
        en: 'It could be a tough day. Take care of yourself without overexerting.',
        zh: '可能会是有点辛苦的一天。不要勉强，照顾好自己。',
        ja: '少し大変な一日になるかもしれません。無理せず自分を大切にしてください。',
        es: 'Podría ser un día difícil. Cuídate sin esforzarte demasiado.',
      },
      {
        ko: '예상치 못한 어려움이 있을 수 있습니다. 침착하게 대응하세요.',
        en: 'There may be unexpected difficulties. Respond calmly.',
        zh: '可能会有意想不到的困难。请冷静应对。',
        ja: '予想外の困難があるかもしれません。落ち着いて対応してください。',
        es: 'Puede haber dificultades inesperadas. Responde con calma.',
      },
      {
        ko: '에너지가 낮은 날입니다. 휴식을 취하며 재충전하세요.',
        en: 'A low energy day. Rest and recharge.',
        zh: '能量较低的一天。休息一下，充充电吧。',
        ja: 'エネルギーが低い日です。休息を取って充電してください。',
        es: 'Un día de baja energía. Descansa y recarga.',
      },
      {
        ko: '신중한 결정이 필요한 날입니다. 중요한 일은 미루는 것이 좋겠습니다.',
        en: 'A day that requires careful decisions. It would be better to postpone important matters.',
        zh: '需要谨慎决定的一天。重要的事情最好推迟。',
        ja: '慎重な決定が必要な日です。重要なことは延期した方が良いでしょう。',
        es: 'Un día que requiere decisiones cuidadosas. Sería mejor posponer asuntos importantes.',
      },
      {
        ko: '도전보다는 안정을 추구하는 것이 좋은 날입니다.',
        en: 'A day when it is better to seek stability rather than challenges.',
        zh: '比起挑战，更适合追求稳定的一天。',
        ja: 'チャレンジよりも安定を求める方が良い日です。',
        es: 'Un día en el que es mejor buscar estabilidad que desafíos.',
      },
    ],
  },
  love: {
    high: [
      {
        ko: '로맨틱한 에너지가 가득합니다. 연인과 특별한 시간을 보내보세요.',
        en: 'Full of romantic energy. Spend a special time with your loved one.',
        zh: '充满浪漫能量。和爱人度过特别的时光吧。',
        ja: 'ロマンチックなエネルギーに満ちています。恋人と特別な時間を過ごしてみてください。',
        es: 'Lleno de energía romántica. Pasa un tiempo especial con tu pareja.',
      },
      {
        ko: '사랑의 행운이 함께합니다. 솔로라면 새로운 만남이 있을 수 있습니다.',
        en: 'Love luck is with you. If you are single, you may have a new encounter.',
        zh: '爱情好运伴随着你。如果是单身，可能会有新的邂逅。',
        ja: '恋愛運が高まっています。シングルなら新しい出会いがあるかもしれません。',
        es: 'La suerte en el amor está contigo. Si estás soltero/a, puedes tener un nuevo encuentro.',
      },
      {
        ko: '마음이 통하는 대화가 오갈 것입니다. 진심을 표현해보세요.',
        en: 'Heart-to-heart conversations will flow. Express your true feelings.',
        zh: '心灵相通的对话将会发生。试着表达你的真心吧。',
        ja: '心が通じ合う会話が交わされるでしょう。本心を表現してみてください。',
        es: 'Fluirán conversaciones de corazón a corazón. Expresa tus verdaderos sentimientos.',
      },
      {
        ko: '관계가 한층 깊어지는 날입니다. 사랑하는 사람에게 감사를 전하세요.',
        en: 'A day when relationships deepen. Express gratitude to your loved one.',
        zh: '关系加深的一天。向你爱的人表达感谢吧。',
        ja: '関係がより深まる日です。愛する人に感謝を伝えましょう。',
        es: 'Un día en el que las relaciones se profundizan. Expresa gratitud a tu ser querido.',
      },
      {
        ko: '별들이 당신의 사랑을 응원합니다. 용기 내어 고백해보세요.',
        en: 'The stars support your love. Be brave and confess.',
        zh: '星星支持你的爱情。勇敢表白吧。',
        ja: '星々があなたの恋を応援しています。勇気を出して告白してみてください。',
        es: 'Las estrellas apoyan tu amor. Sé valiente y confiesa.',
      },
    ],
    medium: [
      {
        ko: '평화로운 연애운입니다. 일상 속 작은 애정 표현을 해보세요.',
        en: 'Peaceful love fortune. Show small gestures of affection in daily life.',
        zh: '平和的恋爱运。在日常中表达小小的爱意吧。',
        ja: '穏やかな恋愛運です。日常の中で小さな愛情表現をしてみてください。',
        es: 'Fortuna amorosa tranquila. Muestra pequeños gestos de afecto en la vida diaria.',
      },
      {
        ko: '안정적인 관계가 유지됩니다. 서로를 이해하려는 노력이 필요합니다.',
        en: 'Stable relationships are maintained. Efforts to understand each other are needed.',
        zh: '稳定的关系得以维持。需要努力相互理解。',
        ja: '安定した関係が続きます。お互いを理解しようとする努力が必要です。',
        es: 'Se mantienen relaciones estables. Se necesitan esfuerzos para entenderse mutuamente.',
      },
      {
        ko: '조용하지만 따뜻한 사랑의 에너지가 흐릅니다.',
        en: 'Quiet but warm love energy flows.',
        zh: '安静但温暖的爱情能量流动着。',
        ja: '静かですが温かい愛のエネルギーが流れています。',
        es: 'Fluye energía de amor tranquila pero cálida.',
      },
      {
        ko: '급격한 변화보다는 안정을 추구하세요. 신뢰가 쌓입니다.',
        en: 'Seek stability rather than drastic changes. Trust builds up.',
        zh: '比起急剧变化，追求稳定吧。信任正在建立。',
        ja: '急激な変化よりも安定を求めてください。信頼が築かれていきます。',
        es: 'Busca estabilidad en lugar de cambios drásticos. La confianza se construye.',
      },
      {
        ko: '사랑에 있어 차분한 태도가 좋은 결과를 가져옵니다.',
        en: 'A calm attitude in love brings good results.',
        zh: '在爱情中保持平静的态度会带来好结果。',
        ja: '恋愛において落ち着いた態度が良い結果をもたらします。',
        es: 'Una actitud tranquila en el amor trae buenos resultados.',
      },
    ],
    low: [
      {
        ko: '연애운이 다소 침체됩니다. 갈등을 피하고 대화로 풀어가세요.',
        en: 'Love fortune is somewhat stagnant. Avoid conflicts and resolve through conversation.',
        zh: '恋爱运有些低迷。避免冲突，通过对话解决。',
        ja: '恋愛運がやや低迷しています。衝突を避け、対話で解決してください。',
        es: 'La fortuna amorosa está algo estancada. Evita conflictos y resuelve a través del diálogo.',
      },
      {
        ko: '오해가 생길 수 있는 날입니다. 말을 아끼고 상대를 배려하세요.',
        en: 'A day when misunderstandings may arise. Be careful with words and considerate of others.',
        zh: '可能会产生误解的一天。谨言慎行，体谅对方。',
        ja: '誤解が生じやすい日です。言葉を控えめにし、相手を思いやってください。',
        es: 'Un día en el que pueden surgir malentendidos. Cuida tus palabras y sé considerado.',
      },
      {
        ko: '감정적인 결정은 피하세요. 냉정함이 필요한 시기입니다.',
        en: 'Avoid emotional decisions. This is a time when calmness is needed.',
        zh: '避免感情用事。这是需要冷静的时期。',
        ja: '感情的な決断は避けてください。冷静さが必要な時期です。',
        es: 'Evita decisiones emocionales. Es un momento en el que se necesita calma.',
      },
      {
        ko: '혼자만의 시간이 필요할 수 있습니다. 자신을 돌아보세요.',
        en: 'You may need time alone. Reflect on yourself.',
        zh: '可能需要独处的时间。反思一下自己吧。',
        ja: '一人の時間が必要かもしれません。自分自身を振り返ってみてください。',
        es: 'Puede que necesites tiempo a solas. Reflexiona sobre ti mismo.',
      },
      {
        ko: '관계에서 거리를 두는 것도 방법입니다. 서로에게 여유를 주세요.',
        en: 'Keeping distance in relationships can be a solution. Give each other space.',
        zh: '在关系中保持距离也是一种方法。给彼此一些空间。',
        ja: '関係において距離を置くことも一つの方法です。お互いに余裕を持ちましょう。',
        es: 'Mantener distancia en las relaciones puede ser una solución. Dense espacio mutuamente.',
      },
    ],
  },
  career: {
    high: [
      {
        ko: '업무에서 뛰어난 성과를 낼 수 있는 날입니다. 적극적으로 나서세요.',
        en: 'A day when you can achieve outstanding results at work. Be proactive.',
        zh: '可以在工作中取得卓越成果的一天。积极主动吧。',
        ja: '仕事で優れた成果を出せる日です。積極的に動きましょう。',
        es: 'Un día en el que puedes lograr resultados sobresalientes en el trabajo. Sé proactivo.',
      },
      {
        ko: '승진이나 인정받을 기회가 올 수 있습니다. 자신을 드러내세요.',
        en: 'Opportunities for promotion or recognition may come. Show yourself.',
        zh: '可能会有升职或被认可的机会。展示自己吧。',
        ja: '昇進や認められるチャンスが来るかもしれません。自分をアピールしてください。',
        es: 'Pueden llegar oportunidades de ascenso o reconocimiento. Muéstrate.',
      },
      {
        ko: '새로운 프로젝트나 아이디어가 빛을 발합니다. 창의력을 발휘하세요.',
        en: 'New projects or ideas will shine. Exercise your creativity.',
        zh: '新项目或创意将大放异彩。发挥你的创造力吧。',
        ja: '新しいプロジェクトやアイデアが輝きます。創造力を発揮してください。',
        es: 'Nuevos proyectos o ideas brillarán. Ejerce tu creatividad.',
      },
      {
        ko: '동료들과의 협력이 좋은 결과를 가져옵니다. 팀워크를 발휘하세요.',
        en: 'Cooperation with colleagues brings good results. Exercise teamwork.',
        zh: '与同事的合作会带来好结果。发挥团队精神吧。',
        ja: '同僚との協力が良い結果をもたらします。チームワークを発揮してください。',
        es: 'La cooperación con colegas trae buenos resultados. Ejerce el trabajo en equipo.',
      },
      {
        ko: '리더십을 발휘할 기회입니다. 자신감 있게 앞장서세요.',
        en: 'An opportunity to exercise leadership. Lead with confidence.',
        zh: '发挥领导力的机会。自信地带头吧。',
        ja: 'リーダーシップを発揮するチャンスです。自信を持って先頭に立ってください。',
        es: 'Una oportunidad para ejercer liderazgo. Lidera con confianza.',
      },
    ],
    medium: [
      {
        ko: '순조로운 업무 흐름이 예상됩니다. 계획대로 진행하세요.',
        en: 'A smooth workflow is expected. Proceed as planned.',
        zh: '预计工作流程顺畅。按计划进行吧。',
        ja: '順調な業務の流れが予想されます。計画通りに進めてください。',
        es: 'Se espera un flujo de trabajo fluido. Procede según lo planeado.',
      },
      {
        ko: '무리하지 않는 선에서 꾸준히 노력하세요. 결실을 맺을 것입니다.',
        en: 'Keep working steadily without overexerting. It will bear fruit.',
        zh: '在不勉强的范围内坚持努力。会有收获的。',
        ja: '無理のない範囲で着実に努力してください。実を結ぶでしょう。',
        es: 'Sigue trabajando constantemente sin esforzarte demasiado. Dará frutos.',
      },
      {
        ko: '일상적인 업무에서 만족감을 찾을 수 있습니다.',
        en: 'You can find satisfaction in routine work.',
        zh: '可以在日常工作中找到满足感。',
        ja: '日常的な業務で満足感を見つけられます。',
        es: 'Puedes encontrar satisfacción en el trabajo rutinario.',
      },
      {
        ko: '안정적인 페이스를 유지하는 것이 중요합니다.',
        en: 'Maintaining a stable pace is important.',
        zh: '保持稳定的节奏很重要。',
        ja: '安定したペースを維持することが重要です。',
        es: 'Mantener un ritmo estable es importante.',
      },
      {
        ko: '작은 목표를 세우고 달성해가며 성취감을 느껴보세요.',
        en: 'Set small goals and feel a sense of achievement as you accomplish them.',
        zh: '设定小目标并逐步实现，感受成就感吧。',
        ja: '小さな目標を立てて達成しながら、達成感を感じてみてください。',
        es: 'Establece pequeñas metas y siente logro al alcanzarlas.',
      },
    ],
    low: [
      {
        ko: '업무에서 장애물을 만날 수 있습니다. 인내심을 가지세요.',
        en: 'You may encounter obstacles at work. Be patient.',
        zh: '工作中可能会遇到障碍。保持耐心。',
        ja: '仕事で障害に遭遇するかもしれません。忍耐心を持ってください。',
        es: 'Puedes encontrar obstáculos en el trabajo. Sé paciente.',
      },
      {
        ko: '중요한 결정은 다음으로 미루는 것이 좋겠습니다.',
        en: 'It would be better to postpone important decisions.',
        zh: '重要的决定最好推迟到下次。',
        ja: '重要な決定は次に延期した方が良いでしょう。',
        es: 'Sería mejor posponer decisiones importantes.',
      },
      {
        ko: '동료와의 갈등에 주의하세요. 감정적 대응은 피하세요.',
        en: 'Beware of conflicts with colleagues. Avoid emotional responses.',
        zh: '注意与同事的冲突。避免情绪化反应。',
        ja: '同僚との衝突に注意してください。感情的な対応は避けてください。',
        es: 'Cuidado con los conflictos con colegas. Evita respuestas emocionales.',
      },
      {
        ko: '업무 스트레스가 높을 수 있습니다. 적절한 휴식을 취하세요.',
        en: 'Work stress may be high. Take appropriate rest.',
        zh: '工作压力可能较大。适当休息一下。',
        ja: '仕事のストレスが高いかもしれません。適切な休息を取ってください。',
        es: 'El estrés laboral puede ser alto. Toma descanso apropiado.',
      },
      {
        ko: '실수하기 쉬운 날입니다. 꼼꼼하게 확인하는 습관을 가지세요.',
        en: 'A day when mistakes are easy to make. Have a habit of checking carefully.',
        zh: '容易出错的一天。养成仔细检查的习惯。',
        ja: 'ミスしやすい日です。念入りに確認する習慣を持ちましょう。',
        es: 'Un día en el que es fácil cometer errores. Ten el hábito de verificar cuidadosamente.',
      },
    ],
  },
  health: {
    high: [
      {
        ko: '활력이 넘치는 날입니다. 운동이나 활동적인 일에 적합합니다.',
        en: 'A day full of vitality. Suitable for exercise or active activities.',
        zh: '充满活力的一天。适合运动或积极的活动。',
        ja: '活力に満ちた一日です。運動や活動的なことに適しています。',
        es: 'Un día lleno de vitalidad. Adecuado para ejercicio o actividades activas.',
      },
      {
        ko: '면역력이 높아지는 시기입니다. 건강한 습관을 유지하세요.',
        en: 'A time when immunity increases. Maintain healthy habits.',
        zh: '免疫力提高的时期。保持健康的习惯。',
        ja: '免疫力が高まる時期です。健康的な習慣を維持してください。',
        es: 'Un momento en que la inmunidad aumenta. Mantén hábitos saludables.',
      },
      {
        ko: '심신이 안정되어 있습니다. 명상이나 요가가 좋은 영향을 줍니다.',
        en: 'Your mind and body are stable. Meditation or yoga has a positive effect.',
        zh: '身心稳定。冥想或瑜伽会有好的影响。',
        ja: '心身が安定しています。瞑想やヨガが良い影響を与えます。',
        es: 'Tu mente y cuerpo están estables. La meditación o el yoga tienen un efecto positivo.',
      },
      {
        ko: '에너지가 충만합니다. 새로운 운동을 시작하기 좋은 날입니다.',
        en: 'Full of energy. A good day to start a new exercise routine.',
        zh: '能量充沛。适合开始新运动的一天。',
        ja: 'エネルギーに満ちています。新しい運動を始めるのに良い日です。',
        es: 'Lleno de energía. Un buen día para comenzar una nueva rutina de ejercicios.',
      },
      {
        ko: '회복력이 좋은 시기입니다. 건강 목표를 세워보세요.',
        en: 'A time of good recovery. Set health goals.',
        zh: '恢复力好的时期。设定健康目标吧。',
        ja: '回復力が良い時期です。健康目標を立ててみてください。',
        es: 'Un momento de buena recuperación. Establece metas de salud.',
      },
    ],
    medium: [
      {
        ko: '전반적으로 안정적인 건강 상태입니다. 규칙적인 생활을 유지하세요.',
        en: 'Generally stable health condition. Maintain a regular lifestyle.',
        zh: '整体健康状态稳定。保持规律的生活。',
        ja: '全般的に安定した健康状態です。規則正しい生活を維持してください。',
        es: 'Condición de salud generalmente estable. Mantén un estilo de vida regular.',
      },
      {
        ko: '무리하지 않는 선에서 활동하세요. 균형이 중요합니다.',
        en: 'Be active without overexerting. Balance is important.',
        zh: '在不勉强的范围内活动。平衡很重要。',
        ja: '無理のない範囲で活動してください。バランスが重要です。',
        es: 'Sé activo sin esforzarte demasiado. El equilibrio es importante.',
      },
      {
        ko: '가벼운 산책이나 스트레칭이 도움이 됩니다.',
        en: 'Light walking or stretching helps.',
        zh: '轻松的散步或伸展运动会有帮助。',
        ja: '軽い散歩やストレッチが役立ちます。',
        es: 'Caminar ligero o estirar ayuda.',
      },
      {
        ko: '충분한 수분 섭취와 영양 균형에 신경 쓰세요.',
        en: 'Pay attention to sufficient hydration and nutritional balance.',
        zh: '注意充足的水分摄入和营养均衡。',
        ja: '十分な水分摂取と栄養バランスに気を配ってください。',
        es: 'Presta atención a la hidratación suficiente y el equilibrio nutricional.',
      },
      {
        ko: '일상적인 건강 관리에 충실하면 좋겠습니다.',
        en: 'It would be good to be faithful to daily health care.',
        zh: '忠实于日常健康管理就好了。',
        ja: '日常的な健康管理に忠実であると良いでしょう。',
        es: 'Sería bueno ser fiel al cuidado de la salud diario.',
      },
    ],
    low: [
      {
        ko: '피로가 누적되기 쉬운 날입니다. 충분한 휴식을 취하세요.',
        en: 'A day when fatigue easily accumulates. Get enough rest.',
        zh: '容易累积疲劳的一天。充分休息。',
        ja: '疲労がたまりやすい日です。十分な休息を取ってください。',
        es: 'Un día en que la fatiga se acumula fácilmente. Descansa lo suficiente.',
      },
      {
        ko: '면역력이 약해질 수 있습니다. 건강 관리에 주의하세요.',
        en: 'Immunity may weaken. Pay attention to health care.',
        zh: '免疫力可能下降。注意健康管理。',
        ja: '免疫力が弱まる可能性があります。健康管理に注意してください。',
        es: 'La inmunidad puede debilitarse. Presta atención al cuidado de la salud.',
      },
      {
        ko: '스트레스로 인한 신체 증상에 주의가 필요합니다.',
        en: 'Attention is needed for physical symptoms caused by stress.',
        zh: '需要注意因压力引起的身体症状。',
        ja: 'ストレスによる身体症状に注意が必要です。',
        es: 'Se necesita atención a los síntomas físicos causados por el estrés.',
      },
      {
        ko: '과식이나 과음을 피하세요. 절제가 필요한 시기입니다.',
        en: 'Avoid overeating or drinking. This is a time when moderation is needed.',
        zh: '避免暴饮暴食。这是需要节制的时期。',
        ja: '過食や過度の飲酒は避けてください。節制が必要な時期です。',
        es: 'Evita comer o beber en exceso. Es un momento en que se necesita moderación.',
      },
      {
        ko: '작은 불편함도 무시하지 마세요. 건강 검진을 고려해보세요.',
        en: 'Do not ignore even small discomfort. Consider a health checkup.',
        zh: '不要忽视小小的不适。考虑做健康检查。',
        ja: '小さな不調も無視しないでください。健康診断を検討してみてください。',
        es: 'No ignores ni la más mínima molestia. Considera un chequeo de salud.',
      },
    ],
  },
  money: {
    high: [
      {
        ko: '재물운이 상승하는 날입니다. 투자나 재테크에 좋은 기회가 있습니다.',
        en: 'A day when financial fortune rises. There are good opportunities for investment.',
        zh: '财运上升的一天。有投资理财的好机会。',
        ja: '金運が上昇する日です。投資や資産運用に良い機会があります。',
        es: 'Un día en que la fortuna financiera sube. Hay buenas oportunidades de inversión.',
      },
      {
        ko: '예상치 못한 수입이 생길 수 있습니다. 기회를 놓치지 마세요.',
        en: 'Unexpected income may occur. Do not miss the opportunity.',
        zh: '可能会有意外的收入。不要错过机会。',
        ja: '予想外の収入があるかもしれません。チャンスを逃さないでください。',
        es: 'Pueden ocurrir ingresos inesperados. No pierdas la oportunidad.',
      },
      {
        ko: '금전적인 협상에서 유리한 결과를 얻을 수 있습니다.',
        en: 'You can get favorable results in financial negotiations.',
        zh: '可以在金钱谈判中获得有利的结果。',
        ja: '金銭的な交渉で有利な結果を得られます。',
        es: 'Puedes obtener resultados favorables en negociaciones financieras.',
      },
      {
        ko: '큰 지출에도 여유가 생기는 시기입니다.',
        en: 'A time when you have room for big expenses.',
        zh: '大额支出也能从容应对的时期。',
        ja: '大きな支出にも余裕が生まれる時期です。',
        es: 'Un momento en que tienes espacio para grandes gastos.',
      },
      {
        ko: '재정적 목표 달성에 가까워지고 있습니다. 계속 노력하세요.',
        en: 'You are getting closer to achieving your financial goals. Keep trying.',
        zh: '正在接近财务目标的实现。继续努力。',
        ja: '財政的な目標達成に近づいています。引き続き努力してください。',
        es: 'Te estás acercando a lograr tus metas financieras. Sigue intentando.',
      },
    ],
    medium: [
      {
        ko: '안정적인 재정 상태가 유지됩니다. 계획적인 지출을 하세요.',
        en: 'Stable financial status is maintained. Spend according to plan.',
        zh: '稳定的财务状况得以维持。计划性地支出。',
        ja: '安定した財政状態が維持されます。計画的な支出を心がけてください。',
        es: 'Se mantiene un estado financiero estable. Gasta según el plan.',
      },
      {
        ko: '저축을 늘리기 좋은 시기입니다. 작은 금액부터 시작하세요.',
        en: 'A good time to increase savings. Start with a small amount.',
        zh: '增加储蓄的好时机。从小额开始。',
        ja: '貯蓄を増やすのに良い時期です。少額から始めてください。',
        es: 'Un buen momento para aumentar los ahorros. Comienza con una pequeña cantidad.',
      },
      {
        ko: '불필요한 지출을 줄이고 알뜰하게 생활하세요.',
        en: 'Reduce unnecessary expenses and live frugally.',
        zh: '减少不必要的支出，节俭生活。',
        ja: '不必要な支出を減らし、節約して生活してください。',
        es: 'Reduce gastos innecesarios y vive frugalmente.',
      },
      {
        ko: '재정 상황을 점검하고 예산을 재조정해보세요.',
        en: 'Check your financial situation and readjust your budget.',
        zh: '检查财务状况，重新调整预算。',
        ja: '財政状況を点検し、予算を再調整してみてください。',
        es: 'Revisa tu situación financiera y reajusta tu presupuesto.',
      },
      {
        ko: '현재의 수입 범위 내에서 만족을 찾으세요.',
        en: 'Find satisfaction within your current income range.',
        zh: '在当前收入范围内寻找满足。',
        ja: '現在の収入範囲内で満足を見つけてください。',
        es: 'Encuentra satisfacción dentro de tu rango de ingresos actual.',
      },
    ],
    low: [
      {
        ko: '예상치 못한 지출이 발생할 수 있습니다. 비상금을 확보해두세요.',
        en: 'Unexpected expenses may occur. Secure emergency funds.',
        zh: '可能会有意外支出。确保有应急资金。',
        ja: '予想外の支出が発生する可能性があります。緊急資金を確保しておいてください。',
        es: 'Pueden ocurrir gastos inesperados. Asegura fondos de emergencia.',
      },
      {
        ko: '투자나 큰 지출은 피하는 것이 좋겠습니다.',
        en: 'It would be better to avoid investments or big expenses.',
        zh: '最好避免投资或大额支出。',
        ja: '投資や大きな支出は避けた方が良いでしょう。',
        es: 'Sería mejor evitar inversiones o grandes gastos.',
      },
      {
        ko: '금전 관련 계약은 신중하게 검토하세요.',
        en: 'Carefully review money-related contracts.',
        zh: '谨慎审查与金钱相关的合同。',
        ja: '金銭関連の契約は慎重に検討してください。',
        es: 'Revisa cuidadosamente los contratos relacionados con dinero.',
      },
      {
        ko: '충동구매를 피하고 필요한 것만 구입하세요.',
        en: 'Avoid impulse buying and only buy what you need.',
        zh: '避免冲动购物，只买需要的东西。',
        ja: '衝動買いを避け、必要なものだけ購入してください。',
        es: 'Evita compras impulsivas y solo compra lo que necesitas.',
      },
      {
        ko: '지갑 관리에 주의가 필요합니다. 분실에 조심하세요.',
        en: 'Attention is needed for wallet management. Be careful of loss.',
        zh: '需要注意钱包管理。小心丢失。',
        ja: '財布の管理に注意が必要です。紛失に気をつけてください。',
        es: 'Se necesita atención en la gestión de la cartera. Cuidado con las pérdidas.',
      },
    ],
  },
};

// 행운의 색상 (다국어)
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
