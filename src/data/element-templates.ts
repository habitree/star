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
      { ko: '불꽃 같은 열정이 당신을 이끄는 날입니다. 적극적으로 도전하세요.', en: 'A day when fiery passion leads you. Challenge yourself actively.', zh: '火焰般的热情引领你的一天。积极挑战吧。', ja: '炎のような情熱があなたを導く日です。積極的に挑戦してください。', es: 'Un día en que la pasión ardiente te guía. Desafíate activamente.' },
      { ko: '당신의 용기가 빛나는 시기입니다. 주저하지 말고 앞으로 나아가세요.', en: 'A time when your courage shines. Move forward without hesitation.', zh: '你的勇气闪耀的时期。毫不犹豫地前进吧。', ja: 'あなたの勇気が輝く時期です。躊躇せず前に進んでください。', es: 'Un momento en que tu coraje brilla. Avanza sin dudar.' },
      { ko: '강렬한 에너지가 모든 장애물을 태워버립니다. 승리가 당신 것입니다.', en: 'Intense energy burns away all obstacles. Victory is yours.', zh: '强烈的能量烧尽所有障碍。胜利属于你。', ja: '強烈なエネルギーがすべての障害を焼き払います。勝利はあなたのものです。', es: 'La energía intensa quema todos los obstáculos. La victoria es tuya.' },
    ],
    medium: [
      { ko: '내면의 불꽃을 잘 조절하면 안정적인 하루가 됩니다.', en: 'Controlling your inner flame well makes for a stable day.', zh: '好好控制内心的火焰，会是稳定的一天。', ja: '内なる炎をうまくコントロールすれば安定した一日になります。', es: 'Controlar bien tu llama interior hace que sea un día estable.' },
      { ko: '열정을 유지하되 급하게 서두르지 마세요. 때를 기다리세요.', en: 'Maintain your passion but do not rush. Wait for the right time.', zh: '保持热情但不要着急。等待时机。', ja: '情熱を維持しつつも急がないでください。時を待ちましょう。', es: 'Mantén tu pasión pero no te apresures. Espera el momento adecuado.' },
      { ko: '행동하기 전에 한 번 더 생각하면 좋은 결과를 얻습니다.', en: 'Thinking once more before acting brings good results.', zh: '行动前再想一想会有好结果。', ja: '行動する前にもう一度考えると良い結果が得られます。', es: 'Pensar una vez más antes de actuar trae buenos resultados.' },
    ],
    low: [
      { ko: '에너지를 재충전할 시간입니다. 무리한 도전은 피하세요.', en: 'Time to recharge your energy. Avoid reckless challenges.', zh: '是时候充电了。避免鲁莽的挑战。', ja: 'エネルギーを充電する時間です。無理な挑戦は避けてください。', es: 'Es hora de recargar tu energía. Evita desafíos imprudentes.' },
      { ko: '불꽃이 약해진 날입니다. 잠시 쉬어가며 힘을 모으세요.', en: 'A day when the flame weakens. Rest and gather strength.', zh: '火焰减弱的一天。休息一下，积蓄力量。', ja: '炎が弱まった日です。少し休んで力を蓄えてください。', es: 'Un día en que la llama se debilita. Descansa y reúne fuerzas.' },
      { ko: '충동적인 행동을 자제하세요. 신중함이 필요한 시기입니다.', en: 'Refrain from impulsive actions. This is a time for caution.', zh: '克制冲动行为。这是需要谨慎的时期。', ja: '衝動的な行動は控えてください。慎重さが必要な時期です。', es: 'Abstente de acciones impulsivas. Es un momento para la cautela.' },
    ],
  },
  love: {
    high: [
      { ko: '뜨거운 사랑의 에너지가 가득합니다. 열정적으로 표현하세요.', en: 'Full of hot love energy. Express yourself passionately.', zh: '充满炽热的爱情能量。热情地表达吧。', ja: '熱い愛のエネルギーに満ちています。情熱的に表現してください。', es: 'Lleno de energía amorosa ardiente. Exprésate apasionadamente.' },
      { ko: '당신의 매력이 불꽃처럼 타오릅니다. 사랑을 쟁취할 때입니다.', en: 'Your charm burns like a flame. Time to win love.', zh: '你的魅力如火焰般燃烧。是赢得爱情的时候了。', ja: 'あなたの魅力が炎のように燃え上がります。愛を勝ち取る時です。', es: 'Tu encanto arde como una llama. Es hora de conquistar el amor.' },
      { ko: '용기 있는 고백이 성공할 확률이 높습니다. 지금이 기회입니다.', en: 'A brave confession has high chances of success. Now is the chance.', zh: '勇敢的告白成功率很高。现在是机会。', ja: '勇気ある告白が成功する確率が高いです。今がチャンスです。', es: 'Una confesión valiente tiene altas probabilidades de éxito. Ahora es la oportunidad.' },
    ],
    medium: [
      { ko: '사랑에 있어 차분하게 접근하면 좋은 결과가 있습니다.', en: 'A calm approach to love brings good results.', zh: '在爱情中冷静接近会有好结果。', ja: '恋愛において落ち着いてアプローチすれば良い結果があります。', es: 'Un enfoque tranquilo hacia el amor trae buenos resultados.' },
      { ko: '열정과 배려의 균형이 필요한 시기입니다.', en: 'A time when balance between passion and consideration is needed.', zh: '需要热情与体贴平衡的时期。', ja: '情熱と思いやりのバランスが必要な時期です。', es: 'Un momento en que se necesita equilibrio entre pasión y consideración.' },
      { ko: '상대방의 페이스에 맞추는 것도 사랑입니다.', en: 'Matching your partner pace is also love.', zh: '配合对方的节奏也是爱。', ja: '相手のペースに合わせることも愛です。', es: 'Adaptarse al ritmo de tu pareja también es amor.' },
    ],
    low: [
      { ko: '감정적인 충돌을 피하세요. 한 발짝 물러서서 상황을 보세요.', en: 'Avoid emotional conflicts. Step back and observe the situation.', zh: '避免情感冲突。退一步看看情况。', ja: '感情的な衝突は避けてください。一歩引いて状況を見てください。', es: 'Evita conflictos emocionales. Da un paso atrás y observa la situación.' },
      { ko: '성급한 결정은 후회를 부릅니다. 시간을 두고 생각하세요.', en: 'Hasty decisions bring regret. Take time to think.', zh: '仓促的决定会带来后悔。花时间想想。', ja: '急いだ決定は後悔を招きます。時間をかけて考えてください。', es: 'Las decisiones apresuradas traen arrepentimiento. Tómate tiempo para pensar.' },
      { ko: '오늘은 사랑보다 자기 자신에게 집중하는 것이 좋겠습니다.', en: 'Today it is better to focus on yourself rather than love.', zh: '今天比起爱情，更好专注于自己。', ja: '今日は恋愛よりも自分自身に集中する方が良いでしょう。', es: 'Hoy es mejor concentrarte en ti mismo que en el amor.' },
    ],
  },
  career: {
    high: [
      { ko: '리더십을 발휘할 절호의 기회입니다. 앞장서세요.', en: 'A golden opportunity to exercise leadership. Take the lead.', zh: '发挥领导力的绝佳机会。带头吧。', ja: 'リーダーシップを発揮する絶好の機会です。先頭に立ってください。', es: 'Una oportunidad de oro para ejercer liderazgo. Toma la delantera.' },
      { ko: '도전적인 프로젝트에서 빛날 수 있습니다. 적극적으로 나서세요.', en: 'You can shine in challenging projects. Be proactive.', zh: '在挑战性项目中可以发光。积极主动吧。', ja: '挑戦的なプロジェクトで輝けます。積極的に出てください。', es: 'Puedes brillar en proyectos desafiantes. Sé proactivo.' },
      { ko: '당신의 추진력이 팀을 성공으로 이끕니다.', en: 'Your drive leads the team to success.', zh: '你的推动力带领团队走向成功。', ja: 'あなたの推進力がチームを成功に導きます。', es: 'Tu impulso lleva al equipo al éxito.' },
    ],
    medium: [
      { ko: '꾸준한 노력이 인정받는 시기입니다. 묵묵히 일하세요.', en: 'A time when steady effort is recognized. Work diligently.', zh: '稳定努力得到认可的时期。默默工作吧。', ja: '着実な努力が認められる時期です。黙々と働いてください。', es: 'Un momento en que el esfuerzo constante es reconocido. Trabaja diligentemente.' },
      { ko: '팀워크와 개인 역량의 균형을 맞추세요.', en: 'Balance teamwork and individual capabilities.', zh: '平衡团队合作和个人能力。', ja: 'チームワークと個人の能力のバランスを取ってください。', es: 'Equilibra el trabajo en equipo y las capacidades individuales.' },
      { ko: '작은 성과들이 모여 큰 결실을 맺을 것입니다.', en: 'Small achievements will accumulate into great results.', zh: '小成就积累成大成果。', ja: '小さな成果が集まって大きな実りとなるでしょう。', es: 'Los pequeños logros se acumularán en grandes resultados.' },
    ],
    low: [
      { ko: '직장에서의 갈등은 피하세요. 냉정을 유지하는 것이 중요합니다.', en: 'Avoid conflicts at work. Staying calm is important.', zh: '避免工作中的冲突。保持冷静很重要。', ja: '職場での衝突は避けてください。冷静を保つことが重要です。', es: 'Evita conflictos en el trabajo. Mantener la calma es importante.' },
      { ko: '급한 결정보다 신중한 판단이 필요한 시기입니다.', en: 'A time when careful judgment is needed over hasty decisions.', zh: '比起仓促决定，需要谨慎判断的时期。', ja: '急いだ決定より慎重な判断が必要な時期です。', es: 'Un momento en que se necesita juicio cuidadoso sobre decisiones apresuradas.' },
      { ko: '혼자 해결하려 하지 말고 동료의 도움을 구하세요.', en: 'Do not try to solve alone, seek help from colleagues.', zh: '不要试图独自解决，寻求同事的帮助。', ja: '一人で解決しようとせず、同僚の助けを求めてください。', es: 'No intentes resolver solo, busca ayuda de colegas.' },
    ],
  },
  health: {
    high: [
      { ko: '에너지가 넘치는 날입니다. 활동적인 운동이 좋습니다.', en: 'A day full of energy. Active exercise is good.', zh: '能量满满的一天。积极运动很好。', ja: 'エネルギーに満ちた日です。活動的な運動が良いでしょう。', es: 'Un día lleno de energía. El ejercicio activo es bueno.' },
      { ko: '신체 활력이 최고조입니다. 새로운 스포츠에 도전해보세요.', en: 'Physical vitality is at its peak. Try a new sport.', zh: '身体活力达到顶峰。尝试新运动吧。', ja: '身体の活力が最高潮です。新しいスポーツに挑戦してみてください。', es: 'La vitalidad física está en su punto máximo. Prueba un nuevo deporte.' },
      { ko: '열정적인 활동이 건강에 도움이 되는 시기입니다.', en: 'A time when passionate activities benefit health.', zh: '热情的活动有益健康的时期。', ja: '情熱的な活動が健康に役立つ時期です。', es: 'Un momento en que las actividades apasionadas benefician la salud.' },
    ],
    medium: [
      { ko: '규칙적인 운동 습관을 유지하세요. 꾸준함이 중요합니다.', en: 'Maintain regular exercise habits. Consistency is important.', zh: '保持规律的运动习惯。坚持很重要。', ja: '規則的な運動習慣を維持してください。継続が重要です。', es: 'Mantén hábitos de ejercicio regulares. La consistencia es importante.' },
      { ko: '무리하지 않는 선에서 활동량을 늘려보세요.', en: 'Try increasing activity without overexerting.', zh: '在不勉强的范围内增加活动量。', ja: '無理のない範囲で活動量を増やしてみてください。', es: 'Intenta aumentar la actividad sin esforzarte demasiado.' },
      { ko: '열정과 휴식의 균형이 필요합니다.', en: 'Balance between passion and rest is needed.', zh: '需要热情与休息的平衡。', ja: '情熱と休息のバランスが必要です。', es: 'Se necesita equilibrio entre pasión y descanso.' },
    ],
    low: [
      { ko: '과격한 운동은 피하세요. 부상의 위험이 있습니다.', en: 'Avoid intense exercise. There is risk of injury.', zh: '避免剧烈运动。有受伤风险。', ja: '激しい運動は避けてください。怪我のリスクがあります。', es: 'Evita el ejercicio intenso. Hay riesgo de lesión.' },
      { ko: '몸의 신호에 귀 기울이세요. 휴식이 필요합니다.', en: 'Listen to your body signals. Rest is needed.', zh: '倾听身体的信号。需要休息。', ja: '体の信号に耳を傾けてください。休息が必要です。', es: 'Escucha las señales de tu cuerpo. Se necesita descanso.' },
      { ko: '스트레스로 인한 피로에 주의하세요. 충분히 쉬세요.', en: 'Watch out for stress-related fatigue. Rest enough.', zh: '注意压力引起的疲劳。充分休息。', ja: 'ストレスによる疲労に注意してください。十分に休んでください。', es: 'Cuidado con la fatiga relacionada con el estrés. Descansa lo suficiente.' },
    ],
  },
  money: {
    high: [
      { ko: '과감한 투자가 좋은 결과를 가져올 수 있습니다.', en: 'Bold investments can bring good results.', zh: '大胆投资可能带来好结果。', ja: '大胆な投資が良い結果をもたらす可能性があります。', es: 'Las inversiones audaces pueden traer buenos resultados.' },
      { ko: '재물운이 불타오릅니다. 기회를 놓치지 마세요.', en: 'Financial fortune is blazing. Do not miss opportunities.', zh: '财运正旺。不要错过机会。', ja: '金運が燃え上がっています。チャンスを逃さないでください。', es: 'La fortuna financiera está ardiendo. No pierdas oportunidades.' },
      { ko: '적극적인 재테크 활동이 수익으로 이어집니다.', en: 'Active financial activities lead to profits.', zh: '积极的理财活动带来收益。', ja: '積極的な資産運用が収益につながります。', es: 'Las actividades financieras activas conducen a ganancias.' },
    ],
    medium: [
      { ko: '안정적인 재정 관리가 필요한 시기입니다.', en: 'A time when stable financial management is needed.', zh: '需要稳定财务管理的时期。', ja: '安定した財務管理が必要な時期です。', es: 'Un momento en que se necesita gestión financiera estable.' },
      { ko: '충동구매를 자제하고 계획적으로 지출하세요.', en: 'Refrain from impulse buying and spend according to plan.', zh: '克制冲动购物，计划性支出。', ja: '衝動買いを控え、計画的に支出してください。', es: 'Abstente de compras impulsivas y gasta según el plan.' },
      { ko: '작은 금액부터 저축을 시작하면 좋습니다.', en: 'It is good to start saving from small amounts.', zh: '从小额开始储蓄很好。', ja: '少額から貯蓄を始めると良いでしょう。', es: 'Es bueno empezar a ahorrar desde pequeñas cantidades.' },
    ],
    low: [
      { ko: '위험한 투자는 피하세요. 손실의 가능성이 있습니다.', en: 'Avoid risky investments. There is possibility of loss.', zh: '避免风险投资。有亏损的可能。', ja: 'リスクの高い投資は避けてください。損失の可能性があります。', es: 'Evita inversiones arriesgadas. Hay posibilidad de pérdida.' },
      { ko: '재정 상황을 점검하고 불필요한 지출을 줄이세요.', en: 'Review your financial situation and reduce unnecessary expenses.', zh: '检查财务状况，减少不必要的支出。', ja: '財政状況を点検し、不必要な支出を減らしてください。', es: 'Revisa tu situación financiera y reduce gastos innecesarios.' },
      { ko: '큰 금액의 거래나 계약은 미루는 것이 좋겠습니다.', en: 'It would be better to postpone large transactions or contracts.', zh: '最好推迟大额交易或合同。', ja: '大きな金額の取引や契約は延期した方が良いでしょう。', es: 'Sería mejor posponer transacciones o contratos grandes.' },
    ],
  },
};

// Earth (흙) - 황소자리, 처녀자리, 염소자리
const earthTemplates: ElementTemplates = {
  overall: {
    high: [
      { ko: '안정적인 기반 위에서 성과를 거두는 날입니다. 꾸준함이 빛납니다.', en: 'A day to achieve results on a stable foundation. Steadiness shines.', zh: '在稳定基础上取得成果的一天。稳定性闪耀。', ja: '安定した基盤の上で成果を収める日です。着実さが輝きます。', es: 'Un día para lograr resultados sobre una base estable. La constancia brilla.' },
      { ko: '실용적인 접근이 좋은 결과를 가져옵니다. 계획대로 진행하세요.', en: 'A practical approach brings good results. Proceed as planned.', zh: '务实的方法带来好结果。按计划进行。', ja: '実用的なアプローチが良い結果をもたらします。計画通りに進めてください。', es: 'Un enfoque práctico trae buenos resultados. Procede según lo planeado.' },
      { ko: '인내와 성실함이 보상받는 시기입니다.', en: 'A time when patience and diligence are rewarded.', zh: '耐心和勤奋得到回报的时期。', ja: '忍耐と誠実さが報われる時期です。', es: 'Un momento en que la paciencia y la diligencia son recompensadas.' },
    ],
    medium: [
      { ko: '일상의 루틴을 잘 유지하면 안정을 찾을 수 있습니다.', en: 'Maintaining your daily routine well can bring stability.', zh: '保持好日常规律可以找到稳定。', ja: '日常のルーティンをうまく維持すれば安定を見つけられます。', es: 'Mantener bien tu rutina diaria puede traer estabilidad.' },
      { ko: '급격한 변화보다 점진적인 개선에 집중하세요.', en: 'Focus on gradual improvement rather than drastic change.', zh: '专注于渐进改善而非剧烈变化。', ja: '急激な変化より段階的な改善に集中してください。', es: 'Concéntrate en la mejora gradual en lugar del cambio drástico.' },
      { ko: '현실적인 목표 설정이 성공의 열쇠입니다.', en: 'Setting realistic goals is the key to success.', zh: '设定现实目标是成功的关键。', ja: '現実的な目標設定が成功の鍵です。', es: 'Establecer metas realistas es la clave del éxito.' },
    ],
    low: [
      { ko: '변화에 대한 저항감을 줄이세요. 유연성이 필요합니다.', en: 'Reduce resistance to change. Flexibility is needed.', zh: '减少对变化的抵触。需要灵活性。', ja: '変化への抵抗を減らしてください。柔軟性が必要です。', es: 'Reduce la resistencia al cambio. Se necesita flexibilidad.' },
      { ko: '고집을 부리면 손해를 볼 수 있습니다. 타협을 고려하세요.', en: 'Being stubborn can cause loss. Consider compromise.', zh: '固执可能会吃亏。考虑妥协。', ja: '頑固になると損をする可能性があります。妥協を検討してください。', es: 'Ser terco puede causar pérdidas. Considera el compromiso.' },
      { ko: '완벽을 추구하다 기회를 놓칠 수 있습니다. 적당히 만족하세요.', en: 'Pursuing perfection may miss opportunities. Be satisfied moderately.', zh: '追求完美可能会错失机会。适当满足吧。', ja: '完璧を追求しすぎてチャンスを逃す可能性があります。適度に満足してください。', es: 'Perseguir la perfección puede perder oportunidades. Siéntete satisfecho moderadamente.' },
    ],
  },
  love: {
    high: [
      { ko: '안정적이고 신뢰할 수 있는 사랑이 깊어집니다.', en: 'Stable and trustworthy love deepens.', zh: '稳定可靠的爱情加深。', ja: '安定して信頼できる愛が深まります。', es: 'El amor estable y confiable se profundiza.' },
      { ko: '진실된 마음이 상대방에게 전해지는 날입니다.', en: 'A day when your true heart reaches your partner.', zh: '真诚的心意传达给对方的一天。', ja: '真実の心が相手に伝わる日です。', es: 'Un día en que tu corazón verdadero llega a tu pareja.' },
      { ko: '오래 지속될 관계의 기반을 다질 수 있습니다.', en: 'You can build the foundation for a lasting relationship.', zh: '可以奠定持久关系的基础。', ja: '長く続く関係の基盤を築けます。', es: 'Puedes construir la base para una relación duradera.' },
    ],
    medium: [
      { ko: '서로에 대한 신뢰를 쌓아가는 시기입니다.', en: 'A time to build trust in each other.', zh: '建立相互信任的时期。', ja: 'お互いへの信頼を築いていく時期です。', es: 'Un momento para construir confianza mutua.' },
      { ko: '일상 속 작은 배려가 사랑을 키웁니다.', en: 'Small considerations in daily life grow love.', zh: '日常中的小关怀培养爱情。', ja: '日常の中の小さな思いやりが愛を育てます。', es: 'Las pequeñas consideraciones en la vida diaria hacen crecer el amor.' },
      { ko: '급하게 관계를 진전시키려 하지 마세요. 천천히 가세요.', en: 'Do not rush to advance the relationship. Go slowly.', zh: '不要急于推进关系。慢慢来。', ja: '急いで関係を進展させようとしないでください。ゆっくり進みましょう。', es: 'No te apresures en avanzar la relación. Ve despacio.' },
    ],
    low: [
      { ko: '소유욕이나 집착을 경계하세요. 상대에게 공간을 주세요.', en: 'Beware of possessiveness or obsession. Give space to your partner.', zh: '警惕占有欲或执着。给对方空间。', ja: '所有欲や執着に注意してください。相手に空間を与えてください。', es: 'Cuidado con la posesividad u obsesión. Dale espacio a tu pareja.' },
      { ko: '고집으로 인한 갈등이 생길 수 있습니다. 유연하게 대처하세요.', en: 'Conflicts due to stubbornness may arise. Deal flexibly.', zh: '可能因固执产生冲突。灵活应对。', ja: '頑固さによる衝突が起きる可能性があります。柔軟に対処してください。', es: 'Pueden surgir conflictos por terquedad. Maneja con flexibilidad.' },
      { ko: '현실적인 기대를 가지세요. 이상과 현실의 차이를 인정하세요.', en: 'Have realistic expectations. Accept the gap between ideal and reality.', zh: '保持现实的期望。接受理想与现实的差距。', ja: '現実的な期待を持ってください。理想と現実の差を認めてください。', es: 'Ten expectativas realistas. Acepta la brecha entre lo ideal y la realidad.' },
    ],
  },
  career: {
    high: [
      { ko: '꾸준한 노력이 드디어 결실을 맺습니다. 성과를 자랑스러워하세요.', en: 'Steady effort finally bears fruit. Be proud of your achievements.', zh: '稳定的努力终于结出果实。为成果感到自豪。', ja: '着実な努力がついに実を結びます。成果を誇りに思ってください。', es: 'El esfuerzo constante finalmente da frutos. Siéntete orgulloso de tus logros.' },
      { ko: '실무 능력이 인정받는 시기입니다. 전문성을 발휘하세요.', en: 'A time when practical skills are recognized. Exercise your expertise.', zh: '实务能力得到认可的时期。发挥专业性。', ja: '実務能力が認められる時期です。専門性を発揮してください。', es: 'Un momento en que las habilidades prácticas son reconocidas. Ejerce tu experiencia.' },
      { ko: '장기적인 프로젝트에서 좋은 진전이 있습니다.', en: 'Good progress in long-term projects.', zh: '长期项目有良好进展。', ja: '長期的なプロジェクトで良い進展があります。', es: 'Buen progreso en proyectos a largo plazo.' },
    ],
    medium: [
      { ko: '맡은 일을 묵묵히 처리하면 좋은 평가를 받습니다.', en: 'Quietly handling your tasks brings good evaluation.', zh: '默默处理工作会得到好评。', ja: '任された仕事を黙々とこなせば良い評価を受けます。', es: 'Manejar tus tareas silenciosamente trae buena evaluación.' },
      { ko: '기본에 충실하세요. 화려함보다 내실이 중요합니다.', en: 'Be faithful to the basics. Substance is more important than flash.', zh: '忠于基础。实质比华丽更重要。', ja: '基本に忠実にしてください。華やかさより中身が重要です。', es: 'Sé fiel a los básicos. La sustancia es más importante que el brillo.' },
      { ko: '체계적인 업무 관리가 효율을 높입니다.', en: 'Systematic work management increases efficiency.', zh: '系统的工作管理提高效率。', ja: '体系的な業務管理が効率を高めます。', es: 'La gestión sistemática del trabajo aumenta la eficiencia.' },
    ],
    low: [
      { ko: '변화에 적응하는 것이 어려울 수 있습니다. 열린 마음을 가지세요.', en: 'Adapting to change may be difficult. Keep an open mind.', zh: '适应变化可能很困难。保持开放的心态。', ja: '変化に適応するのが難しいかもしれません。オープンな心を持ってください。', es: 'Adaptarse al cambio puede ser difícil. Mantén una mente abierta.' },
      { ko: '완벽주의가 업무 진행을 늦출 수 있습니다. 우선순위를 정하세요.', en: 'Perfectionism may slow work progress. Set priorities.', zh: '完美主义可能会拖慢工作进度。设定优先级。', ja: '完璧主義が業務の進行を遅らせる可能性があります。優先順位を決めてください。', es: 'El perfeccionismo puede ralentizar el progreso del trabajo. Establece prioridades.' },
      { ko: '새로운 방식을 시도하는 것을 두려워하지 마세요.', en: 'Do not be afraid to try new methods.', zh: '不要害怕尝试新方法。', ja: '新しい方法を試すことを恐れないでください。', es: 'No tengas miedo de probar nuevos métodos.' },
    ],
  },
  health: {
    high: [
      { ko: '건강의 기반이 튼튼한 시기입니다. 좋은 습관을 유지하세요.', en: 'A time when health foundation is solid. Maintain good habits.', zh: '健康基础坚实的时期。保持好习惯。', ja: '健康の基盤がしっかりしている時期です。良い習慣を維持してください。', es: 'Un momento en que la base de salud es sólida. Mantén buenos hábitos.' },
      { ko: '규칙적인 생활이 활력을 가져옵니다.', en: 'Regular lifestyle brings vitality.', zh: '规律的生活带来活力。', ja: '規則正しい生活が活力をもたらします。', es: 'Un estilo de vida regular trae vitalidad.' },
      { ko: '건강한 식습관의 효과가 나타나는 시기입니다.', en: 'A time when the effects of healthy eating habits appear.', zh: '健康饮食习惯效果显现的时期。', ja: '健康的な食習慣の効果が現れる時期です。', es: 'Un momento en que aparecen los efectos de hábitos alimenticios saludables.' },
    ],
    medium: [
      { ko: '꾸준한 건강 관리를 계속하세요. 일관성이 중요합니다.', en: 'Continue steady health management. Consistency is important.', zh: '继续稳定的健康管理。一致性很重要。', ja: '着実な健康管理を続けてください。一貫性が重要です。', es: 'Continúa con la gestión de salud constante. La consistencia es importante.' },
      { ko: '무리하지 않는 범위에서 운동을 하세요.', en: 'Exercise within a range that does not strain you.', zh: '在不勉强的范围内运动。', ja: '無理のない範囲で運動してください。', es: 'Haz ejercicio dentro de un rango que no te esfuerce.' },
      { ko: '영양 균형을 신경 쓰면 좋겠습니다.', en: 'It would be good to pay attention to nutritional balance.', zh: '注意营养均衡会很好。', ja: '栄養バランスに気を配ると良いでしょう。', es: 'Sería bueno prestar atención al equilibrio nutricional.' },
    ],
    low: [
      { ko: '과로에 주의하세요. 몸이 보내는 신호를 무시하지 마세요.', en: 'Watch out for overwork. Do not ignore signals from your body.', zh: '注意过劳。不要忽视身体的信号。', ja: '過労に注意してください。体が送る信号を無視しないでください。', es: 'Cuidado con el exceso de trabajo. No ignores las señales de tu cuerpo.' },
      { ko: '스트레스가 몸에 영향을 줄 수 있습니다. 이완 시간을 가지세요.', en: 'Stress may affect your body. Take time to relax.', zh: '压力可能影响身体。花时间放松。', ja: 'ストレスが体に影響を与える可能性があります。リラックスする時間を持ってください。', es: 'El estrés puede afectar tu cuerpo. Tómate tiempo para relajarte.' },
      { ko: '건강에 대한 걱정이 오히려 건강을 해칠 수 있습니다. 긍정적으로 생각하세요.', en: 'Worrying about health may harm health. Think positively.', zh: '对健康的担忧反而可能损害健康。积极思考。', ja: '健康への心配がかえって健康を害する可能性があります。ポジティブに考えてください。', es: 'Preocuparse por la salud puede dañar la salud. Piensa positivamente.' },
    ],
  },
  money: {
    high: [
      { ko: '재정적 안정이 강화되는 시기입니다. 저축이 빛을 발합니다.', en: 'A time when financial stability strengthens. Savings shine.', zh: '财务稳定加强的时期。储蓄发光。', ja: '財政的安定が強化される時期です。貯蓄が輝きます。', es: 'Un momento en que la estabilidad financiera se fortalece. Los ahorros brillan.' },
      { ko: '장기 투자의 수익이 기대됩니다.', en: 'Returns from long-term investments are expected.', zh: '期待长期投资的收益。', ja: '長期投資の収益が期待されます。', es: 'Se esperan retornos de inversiones a largo plazo.' },
      { ko: '현명한 재정 관리가 풍요를 가져옵니다.', en: 'Wise financial management brings abundance.', zh: '明智的财务管理带来富裕。', ja: '賢明な財務管理が豊かさをもたらします。', es: 'La gestión financiera sabia trae abundancia.' },
    ],
    medium: [
      { ko: '계획적인 지출로 재정 균형을 유지하세요.', en: 'Maintain financial balance with planned spending.', zh: '通过计划支出保持财务平衡。', ja: '計画的な支出で財政バランスを維持してください。', es: 'Mantén el equilibrio financiero con gastos planificados.' },
      { ko: '불필요한 지출을 줄이면 여유가 생깁니다.', en: 'Reducing unnecessary expenses creates room.', zh: '减少不必要的支出会有余裕。', ja: '不必要な支出を減らせば余裕が生まれます。', es: 'Reducir gastos innecesarios crea espacio.' },
      { ko: '현실적인 예산 계획을 세우세요.', en: 'Set a realistic budget plan.', zh: '制定现实的预算计划。', ja: '現実的な予算計画を立ててください。', es: 'Establece un plan de presupuesto realista.' },
    ],
    low: [
      { ko: '물질에 대한 집착을 줄이세요. 진정한 가치를 생각하세요.', en: 'Reduce attachment to material things. Think about true value.', zh: '减少对物质的执着。思考真正的价值。', ja: '物質への執着を減らしてください。本当の価値を考えてください。', es: 'Reduce el apego a las cosas materiales. Piensa en el verdadero valor.' },
      { ko: '지나친 절약이 스트레스가 될 수 있습니다. 적당히 즐기세요.', en: 'Excessive saving can be stressful. Enjoy moderately.', zh: '过度节约可能会有压力。适当享受。', ja: '過度な節約がストレスになる可能性があります。適度に楽しんでください。', es: 'El ahorro excesivo puede ser estresante. Disfruta moderadamente.' },
      { ko: '예상치 못한 지출에 대비하세요. 비상금을 확보해두세요.', en: 'Prepare for unexpected expenses. Secure emergency funds.', zh: '为意外支出做准备。确保有应急资金。', ja: '予想外の支出に備えてください。緊急資金を確保しておいてください。', es: 'Prepárate para gastos inesperados. Asegura fondos de emergencia.' },
    ],
  },
};

// Air (공기) - 쌍둥이자리, 천칭자리, 물병자리
const airTemplates: ElementTemplates = {
  overall: {
    high: [
      { ko: '새로운 아이디어와 영감이 넘치는 날입니다. 창의력을 발휘하세요.', en: 'A day overflowing with new ideas and inspiration. Exercise your creativity.', zh: '充满新想法和灵感的一天。发挥创造力。', ja: '新しいアイデアとインスピレーションに溢れる日です。創造力を発揮してください。', es: 'Un día rebosante de nuevas ideas e inspiración. Ejerce tu creatividad.' },
      { ko: '소통과 교류가 행운을 가져오는 시기입니다. 적극적으로 대화하세요.', en: 'A time when communication and exchange bring luck. Actively engage in conversation.', zh: '沟通和交流带来好运的时期。积极对话。', ja: 'コミュニケーションと交流が幸運をもたらす時期です。積極的に会話してください。', es: 'Un momento en que la comunicación e intercambio traen suerte. Participa activamente en conversaciones.' },
      { ko: '지적 호기심이 좋은 결과로 이어집니다. 배움의 기회를 잡으세요.', en: 'Intellectual curiosity leads to good results. Seize learning opportunities.', zh: '求知欲带来好结果。抓住学习机会。', ja: '知的好奇心が良い結果につながります。学びの機会をつかんでください。', es: 'La curiosidad intelectual conduce a buenos resultados. Aprovecha las oportunidades de aprendizaje.' },
    ],
    medium: [
      { ko: '다양한 관점을 고려하면 해답을 찾을 수 있습니다.', en: 'Considering various perspectives can find answers.', zh: '考虑各种观点可以找到答案。', ja: '様々な視点を考慮すれば答えを見つけられます。', es: 'Considerar varias perspectivas puede encontrar respuestas.' },
      { ko: '가벼운 마음으로 상황을 바라보세요. 너무 심각하게 생각하지 마세요.', en: 'Look at the situation with a light heart. Do not think too seriously.', zh: '轻松地看待情况。不要想得太严重。', ja: '軽い気持ちで状況を見てください。あまり深刻に考えないでください。', es: 'Mira la situación con corazón ligero. No pienses demasiado seriamente.' },
      { ko: '정보 수집이 도움이 되는 시기입니다. 주변을 살펴보세요.', en: 'A time when gathering information helps. Look around.', zh: '收集信息有帮助的时期。看看周围。', ja: '情報収集が役立つ時期です。周りを見渡してください。', es: 'Un momento en que recopilar información ayuda. Mira a tu alrededor.' },
    ],
    low: [
      { ko: '생각이 너무 많아 결정을 미루게 될 수 있습니다. 직감을 믿으세요.', en: 'Too many thoughts may delay decisions. Trust your intuition.', zh: '想太多可能会推迟决定。相信直觉。', ja: '考えすぎて決定を先延ばしにする可能性があります。直感を信じてください。', es: 'Demasiados pensamientos pueden retrasar decisiones. Confía en tu intuición.' },
      { ko: '산만함에 주의하세요. 한 가지에 집중하는 것이 중요합니다.', en: 'Watch out for distraction. Focusing on one thing is important.', zh: '注意分心。专注于一件事很重要。', ja: '散漫さに注意してください。一つのことに集中することが重要です。', es: 'Cuidado con la distracción. Concentrarte en una cosa es importante.' },
      { ko: '말보다 행동이 필요한 시기입니다. 실천에 옮기세요.', en: 'A time when action is needed over words. Put it into practice.', zh: '需要行动而非言语的时期。付诸实践。', ja: '言葉より行動が必要な時期です。実践に移してください。', es: 'Un momento en que se necesita acción sobre palabras. Ponlo en práctica.' },
    ],
  },
  love: {
    high: [
      { ko: '대화를 통해 마음이 통하는 날입니다. 솔직하게 이야기하세요.', en: 'A day when hearts connect through conversation. Talk honestly.', zh: '通过对话心灵相通的一天。坦诚交谈。', ja: '会話を通じて心が通じ合う日です。素直に話してください。', es: 'Un día en que los corazones se conectan a través de la conversación. Habla honestamente.' },
      { ko: '지적인 교감이 사랑을 깊게 합니다. 함께 배우는 시간을 가지세요.', en: 'Intellectual connection deepens love. Have time to learn together.', zh: '智慧的交流加深爱情。一起学习吧。', ja: '知的な交感が愛を深めます。一緒に学ぶ時間を持ってください。', es: 'La conexión intelectual profundiza el amor. Ten tiempo para aprender juntos.' },
      { ko: '새로운 만남의 기회가 많습니다. 사교 활동에 참여하세요.', en: 'There are many opportunities for new encounters. Participate in social activities.', zh: '有很多新邂逅的机会。参加社交活动。', ja: '新しい出会いの機会が多いです。社交活動に参加してください。', es: 'Hay muchas oportunidades para nuevos encuentros. Participa en actividades sociales.' },
    ],
    medium: [
      { ko: '가벼운 대화가 관계를 부드럽게 합니다.', en: 'Light conversation smooths relationships.', zh: '轻松的对话使关系更顺畅。', ja: '軽い会話が関係を和らげます。', es: 'La conversación ligera suaviza las relaciones.' },
      { ko: '상대방의 생각을 경청하는 것이 중요합니다.', en: 'Listening to your partner thoughts is important.', zh: '倾听对方的想法很重要。', ja: '相手の考えに耳を傾けることが重要です。', es: 'Escuchar los pensamientos de tu pareja es importante.' },
      { ko: '친구 같은 편안한 관계가 사랑의 기반이 됩니다.', en: 'A comfortable friendship-like relationship becomes the foundation of love.', zh: '像朋友一样舒适的关系是爱情的基础。', ja: '友達のような快適な関係が愛の基盤になります。', es: 'Una relación cómoda como amistad se convierte en la base del amor.' },
    ],
    low: [
      { ko: '말실수에 주의하세요. 상대방의 감정을 헤아리세요.', en: 'Watch out for slips of the tongue. Consider your partner feelings.', zh: '注意说错话。考虑对方的感受。', ja: '言い間違いに注意してください。相手の感情を汲み取ってください。', es: 'Cuidado con los lapsus. Considera los sentimientos de tu pareja.' },
      { ko: '너무 분석적으로 접근하지 마세요. 감정도 중요합니다.', en: 'Do not approach too analytically. Emotions are also important.', zh: '不要太过分析。情感也很重要。', ja: 'あまり分析的にアプローチしないでください。感情も重要です。', es: 'No te acerques demasiado analíticamente. Las emociones también son importantes.' },
      { ko: '결정을 미루다 기회를 놓칠 수 있습니다. 용기를 내세요.', en: 'Delaying decisions may miss opportunities. Be brave.', zh: '推迟决定可能会错失机会。勇敢一点。', ja: '決定を先延ばしにしてチャンスを逃す可能性があります。勇気を出してください。', es: 'Retrasar decisiones puede perder oportunidades. Sé valiente.' },
    ],
  },
  career: {
    high: [
      { ko: '창의적인 아이디어가 인정받습니다. 제안을 주저하지 마세요.', en: 'Creative ideas are recognized. Do not hesitate to make suggestions.', zh: '创意想法得到认可。不要犹豫提出建议。', ja: '創造的なアイデアが認められます。提案を躊躇しないでください。', es: 'Las ideas creativas son reconocidas. No dudes en hacer sugerencias.' },
      { ko: '커뮤니케이션 능력이 빛나는 시기입니다. 발표나 회의에서 좋은 성과를 거둡니다.', en: 'A time when communication skills shine. Good results in presentations or meetings.', zh: '沟通能力闪耀的时期。在演讲或会议中取得好成果。', ja: 'コミュニケーション能力が輝く時期です。発表や会議で良い成果を収めます。', es: 'Un momento en que las habilidades de comunicación brillan. Buenos resultados en presentaciones o reuniones.' },
      { ko: '네트워킹이 새로운 기회를 가져옵니다.', en: 'Networking brings new opportunities.', zh: '人脉带来新机会。', ja: 'ネットワーキングが新しい機会をもたらします。', es: 'El networking trae nuevas oportunidades.' },
    ],
    medium: [
      { ko: '팀과의 소통에 집중하세요. 협업이 중요합니다.', en: 'Focus on communication with the team. Collaboration is important.', zh: '专注于与团队的沟通。协作很重要。', ja: 'チームとのコミュニケーションに集中してください。協業が重要です。', es: 'Concéntrate en la comunicación con el equipo. La colaboración es importante.' },
      { ko: '다양한 업무를 효율적으로 처리하세요. 우선순위를 정하면 도움이 됩니다.', en: 'Handle various tasks efficiently. Setting priorities helps.', zh: '高效处理各种工作。设定优先级会有帮助。', ja: '様々な業務を効率的に処理してください。優先順位を決めると役立ちます。', es: 'Maneja varias tareas eficientemente. Establecer prioridades ayuda.' },
      { ko: '정보 공유가 팀의 성과를 높입니다.', en: 'Sharing information improves team performance.', zh: '信息共享提高团队绩效。', ja: '情報共有がチームの成果を高めます。', es: 'Compartir información mejora el rendimiento del equipo.' },
    ],
    low: [
      { ko: '집중력이 흐트러질 수 있습니다. 한 번에 하나씩 처리하세요.', en: 'Concentration may scatter. Handle one thing at a time.', zh: '注意力可能分散。一次处理一件事。', ja: '集中力が乱れる可能性があります。一度に一つずつ処理してください。', es: 'La concentración puede dispersarse. Maneja una cosa a la vez.' },
      { ko: '말보다 결과로 보여주는 것이 필요합니다.', en: 'Showing results rather than words is needed.', zh: '需要用结果而非言语来证明。', ja: '言葉より結果で示すことが必要です。', es: 'Se necesita mostrar resultados en lugar de palabras.' },
      { ko: '약속은 반드시 지키세요. 신뢰가 중요한 시기입니다.', en: 'Always keep promises. Trust is important at this time.', zh: '一定要遵守承诺。这是信任重要的时期。', ja: '約束は必ず守ってください。信頼が重要な時期です。', es: 'Siempre cumple las promesas. La confianza es importante en este momento.' },
    ],
  },
  health: {
    high: [
      { ko: '정신적 활력이 넘치는 날입니다. 새로운 것을 배워보세요.', en: 'A day full of mental vitality. Try learning something new.', zh: '精神活力充沛的一天。学习新事物吧。', ja: '精神的な活力に満ちた日です。新しいことを学んでみてください。', es: 'Un día lleno de vitalidad mental. Prueba aprender algo nuevo.' },
      { ko: '사교 활동이 기분 전환에 도움이 됩니다.', en: 'Social activities help refresh your mood.', zh: '社交活动有助于转换心情。', ja: '社交活動が気分転換に役立ちます。', es: 'Las actividades sociales ayudan a refrescar tu ánimo.' },
      { ko: '호흡과 명상이 마음의 안정을 가져옵니다.', en: 'Breathing and meditation bring peace of mind.', zh: '呼吸和冥想带来心灵的平静。', ja: '呼吸と瞑想が心の安定をもたらします。', es: 'La respiración y la meditación traen paz mental.' },
    ],
    medium: [
      { ko: '정신 건강에 신경 쓰세요. 스트레스 관리가 중요합니다.', en: 'Pay attention to mental health. Stress management is important.', zh: '关注心理健康。压力管理很重要。', ja: '精神的な健康に気を配ってください。ストレス管理が重要です。', es: 'Presta atención a la salud mental. La gestión del estrés es importante.' },
      { ko: '가벼운 야외 활동이 기분을 좋게 합니다.', en: 'Light outdoor activities improve mood.', zh: '轻松的户外活动让心情变好。', ja: '軽い屋外活動が気分を良くします。', es: 'Las actividades ligeras al aire libre mejoran el ánimo.' },
      { ko: '충분한 수면이 두뇌 활동에 도움이 됩니다.', en: 'Sufficient sleep helps brain activity.', zh: '充足的睡眠有助于大脑活动。', ja: '十分な睡眠が脳の活動に役立ちます。', es: 'El sueño suficiente ayuda a la actividad cerebral.' },
    ],
    low: [
      { ko: '과도한 정보 섭취가 피로를 줄 수 있습니다. 디지털 디톡스를 하세요.', en: 'Excessive information intake can cause fatigue. Do a digital detox.', zh: '过多的信息摄入可能导致疲劳。进行数字排毒。', ja: '過度な情報摂取が疲労を与える可能性があります。デジタルデトックスをしてください。', es: 'El consumo excesivo de información puede causar fatiga. Haz una desintoxicación digital.' },
      { ko: '불안한 생각이 들 수 있습니다. 깊은 호흡으로 마음을 진정시키세요.', en: 'Anxious thoughts may arise. Calm your mind with deep breathing.', zh: '可能会有焦虑的想法。用深呼吸平静心情。', ja: '不安な考えが浮かぶかもしれません。深い呼吸で心を落ち着かせてください。', es: 'Pueden surgir pensamientos ansiosos. Calma tu mente con respiración profunda.' },
      { ko: '머리를 쉬게 하는 시간이 필요합니다. 단순한 활동을 즐기세요.', en: 'Time to rest your mind is needed. Enjoy simple activities.', zh: '需要让大脑休息的时间。享受简单的活动。', ja: '頭を休ませる時間が必要です。シンプルな活動を楽しんでください。', es: 'Se necesita tiempo para descansar tu mente. Disfruta actividades simples.' },
    ],
  },
  money: {
    high: [
      { ko: '정보력이 재테크에 도움이 됩니다. 트렌드를 파악하세요.', en: 'Information power helps with investments. Understand trends.', zh: '信息能力有助于理财。了解趋势。', ja: '情報力が資産運用に役立ちます。トレンドを把握してください。', es: 'El poder de información ayuda con las inversiones. Comprende las tendencias.' },
      { ko: '다양한 수입원을 개발할 수 있는 시기입니다.', en: 'A time when you can develop various income sources.', zh: '可以开发多种收入来源的时期。', ja: '様々な収入源を開発できる時期です。', es: 'Un momento en que puedes desarrollar varias fuentes de ingresos.' },
      { ko: '네트워크를 통한 기회가 재정에 도움이 됩니다.', en: 'Opportunities through networking help finances.', zh: '通过人脉的机会有助于财务。', ja: 'ネットワークを通じた機会が財政に役立ちます。', es: 'Las oportunidades a través del networking ayudan a las finanzas.' },
    ],
    medium: [
      { ko: '재정 상황을 분석하고 계획을 세우세요.', en: 'Analyze your financial situation and make a plan.', zh: '分析财务状况并制定计划。', ja: '財政状況を分析し、計画を立ててください。', es: 'Analiza tu situación financiera y haz un plan.' },
      { ko: '여러 옵션을 비교해보세요. 최선의 선택을 할 수 있습니다.', en: 'Compare various options. You can make the best choice.', zh: '比较各种选择。可以做出最好的选择。', ja: '複数のオプションを比較してみてください。最善の選択ができます。', es: 'Compara varias opciones. Puedes hacer la mejor elección.' },
      { ko: '작은 지출도 기록하면 재정 관리에 도움이 됩니다.', en: 'Recording even small expenses helps with financial management.', zh: '记录小支出也有助于财务管理。', ja: '小さな支出も記録すれば財務管理に役立ちます。', es: 'Registrar incluso gastos pequeños ayuda con la gestión financiera.' },
    ],
    low: [
      { ko: '충동적인 지출에 주의하세요. 한 번 더 생각하세요.', en: 'Watch out for impulsive spending. Think twice.', zh: '注意冲动消费。再想一想。', ja: '衝動的な支出に注意してください。もう一度考えてください。', es: 'Cuidado con el gasto impulsivo. Piénsalo dos veces.' },
      { ko: '불확실한 정보에 기반한 투자는 피하세요.', en: 'Avoid investments based on uncertain information.', zh: '避免基于不确定信息的投资。', ja: '不確実な情報に基づいた投資は避けてください。', es: 'Evita inversiones basadas en información incierta.' },
      { ko: '약속한 금전 거래는 확실히 처리하세요. 신뢰가 중요합니다.', en: 'Handle promised financial transactions clearly. Trust is important.', zh: '确实处理承诺的金钱交易。信任很重要。', ja: '約束した金銭取引は確実に処理してください。信頼が重要です。', es: 'Maneja las transacciones financieras prometidas claramente. La confianza es importante.' },
    ],
  },
};

// Water (물) - 게자리, 전갈자리, 물고기자리
const waterTemplates: ElementTemplates = {
  overall: {
    high: [
      { ko: '직관이 뛰어난 날입니다. 내면의 소리에 귀 기울이세요.', en: 'A day of excellent intuition. Listen to your inner voice.', zh: '直觉敏锐的一天。倾听内心的声音。', ja: '直感が優れた日です。内なる声に耳を傾けてください。', es: 'Un día de excelente intuición. Escucha tu voz interior.' },
      { ko: '감정의 흐름이 좋은 방향으로 이끕니다. 느낌을 믿으세요.', en: 'The flow of emotions leads in a good direction. Trust your feelings.', zh: '情感的流动引向好的方向。相信感觉。', ja: '感情の流れが良い方向に導きます。感覚を信じてください。', es: 'El flujo de emociones conduce en buena dirección. Confía en tus sentimientos.' },
      { ko: '공감 능력이 주변과의 관계를 깊게 합니다.', en: 'Empathy deepens relationships with those around you.', zh: '共情能力加深与周围人的关系。', ja: '共感能力が周りとの関係を深めます。', es: 'La empatía profundiza las relaciones con quienes te rodean.' },
    ],
    medium: [
      { ko: '감정의 파도를 잘 타면 평온한 하루가 됩니다.', en: 'Riding the waves of emotion well makes for a peaceful day.', zh: '顺应情感的波浪会是平静的一天。', ja: '感情の波をうまく乗りこなせば穏やかな一日になります。', es: 'Montar bien las olas de emoción hace que sea un día tranquilo.' },
      { ko: '조용한 시간이 내면의 치유를 가져옵니다.', en: 'Quiet time brings inner healing.', zh: '安静的时间带来内心的治愈。', ja: '静かな時間が内面の癒しをもたらします。', es: 'El tiempo tranquilo trae sanación interior.' },
      { ko: '예술이나 음악이 영감을 줄 수 있습니다.', en: 'Art or music can provide inspiration.', zh: '艺术或音乐可以带来灵感。', ja: '芸術や音楽がインスピレーションを与えてくれます。', es: 'El arte o la música pueden proporcionar inspiración.' },
    ],
    low: [
      { ko: '감정에 휩쓸리지 않도록 주의하세요. 객관적 시선이 필요합니다.', en: 'Be careful not to be swept away by emotions. An objective view is needed.', zh: '注意不要被情绪冲昏。需要客观的视角。', ja: '感情に流されないように注意してください。客観的な視点が必要です。', es: 'Ten cuidado de no dejarte llevar por las emociones. Se necesita una vista objetiva.' },
      { ko: '우울한 기분이 들 수 있습니다. 밝은 곳에서 시간을 보내세요.', en: 'You may feel depressed. Spend time in bright places.', zh: '可能会感到忧郁。在明亮的地方度过时光。', ja: '憂鬱な気分になるかもしれません。明るい場所で時間を過ごしてください。', es: 'Puedes sentirte deprimido. Pasa tiempo en lugares luminosos.' },
      { ko: '현실과 환상을 구분하는 것이 중요합니다.', en: 'Distinguishing between reality and fantasy is important.', zh: '区分现实与幻想很重要。', ja: '現実と幻想を区別することが重要です。', es: 'Distinguir entre realidad y fantasía es importante.' },
    ],
  },
  love: {
    high: [
      { ko: '깊은 감정적 교감이 이루어지는 날입니다. 진심을 나누세요.', en: 'A day of deep emotional connection. Share your true heart.', zh: '深层情感交流的一天。分享真心。', ja: '深い感情的な交感が成り立つ日です。真心を分かち合ってください。', es: 'Un día de conexión emocional profunda. Comparte tu corazón verdadero.' },
      { ko: '영혼의 단짝을 만날 수 있는 기회가 있습니다.', en: 'There is an opportunity to meet a soulmate.', zh: '有机会遇到灵魂伴侣。', ja: '魂の伴侶に出会える機会があります。', es: 'Hay una oportunidad de conocer a un alma gemela.' },
      { ko: '사랑하는 사람과의 유대감이 더욱 강해집니다.', en: 'The bond with your loved one becomes stronger.', zh: '与爱人的联系更加牢固。', ja: '愛する人との絆がさらに強くなります。', es: 'El vínculo con tu ser querido se vuelve más fuerte.' },
    ],
    medium: [
      { ko: '상대방의 감정을 이해하려고 노력하면 관계가 좋아집니다.', en: 'Trying to understand your partner emotions improves the relationship.', zh: '努力理解对方的情感会改善关系。', ja: '相手の感情を理解しようと努力すれば関係が良くなります。', es: 'Tratar de entender las emociones de tu pareja mejora la relación.' },
      { ko: '포용과 이해가 사랑을 깊게 합니다.', en: 'Acceptance and understanding deepen love.', zh: '包容和理解加深爱情。', ja: '受容と理解が愛を深めます。', es: 'La aceptación y comprensión profundizan el amor.' },
      { ko: '조용하고 로맨틱한 시간이 관계에 도움이 됩니다.', en: 'Quiet and romantic time helps the relationship.', zh: '安静浪漫的时光有助于关系。', ja: '静かでロマンチックな時間が関係に役立ちます。', es: 'El tiempo tranquilo y romántico ayuda a la relación.' },
    ],
    low: [
      { ko: '감정적으로 예민해질 수 있습니다. 오해를 피하도록 소통하세요.', en: 'You may become emotionally sensitive. Communicate to avoid misunderstandings.', zh: '可能会变得情绪敏感。沟通以避免误解。', ja: '感情的に敏感になる可能性があります。誤解を避けるためにコミュニケーションしてください。', es: 'Puedes volverte emocionalmente sensible. Comunícate para evitar malentendidos.' },
      { ko: '집착이나 의존을 경계하세요. 건강한 거리가 필요합니다.', en: 'Beware of obsession or dependence. Healthy distance is needed.', zh: '警惕执着或依赖。需要健康的距离。', ja: '執着や依存に注意してください。健康的な距離が必要です。', es: 'Cuidado con la obsesión o dependencia. Se necesita distancia saludable.' },
      { ko: '과거의 상처가 떠오를 수 있습니다. 치유의 시간을 가지세요.', en: 'Past wounds may resurface. Take time to heal.', zh: '过去的伤痛可能会浮现。花时间治愈。', ja: '過去の傷が浮かび上がるかもしれません。癒しの時間を持ってください。', es: 'Las heridas del pasado pueden resurgir. Tómate tiempo para sanar.' },
    ],
  },
  career: {
    high: [
      { ko: '직감이 업무에서 좋은 결정을 이끕니다.', en: 'Intuition leads to good decisions at work.', zh: '直觉在工作中引导好的决定。', ja: '直感が仕事で良い決定を導きます。', es: 'La intuición conduce a buenas decisiones en el trabajo.' },
      { ko: '창의적인 작업에서 영감이 솟아납니다.', en: 'Inspiration flows in creative work.', zh: '在创意工作中灵感涌现。', ja: '創造的な作業でインスピレーションが湧きます。', es: 'La inspiración fluye en el trabajo creativo.' },
      { ko: '동료들의 마음을 잘 읽어 좋은 협업을 이끌 수 있습니다.', en: 'Reading colleagues minds well can lead to good collaboration.', zh: '善于读懂同事的心可以促进良好的合作。', ja: '同僚の心をよく読んで良い協業を導けます。', es: 'Leer bien las mentes de los colegas puede conducir a buena colaboración.' },
    ],
    medium: [
      { ko: '감정을 업무에서 분리하려고 노력하세요.', en: 'Try to separate emotions from work.', zh: '努力将情绪与工作分开。', ja: '感情を仕事から分離しようと努力してください。', es: 'Intenta separar las emociones del trabajo.' },
      { ko: '팀 내 분위기를 파악하면 업무가 수월해집니다.', en: 'Understanding team atmosphere makes work easier.', zh: '了解团队氛围会使工作更顺利。', ja: 'チーム内の雰囲気を把握すれば業務がスムーズになります。', es: 'Entender la atmósfera del equipo facilita el trabajo.' },
      { ko: '공감 능력이 고객이나 동료와의 관계에 도움이 됩니다.', en: 'Empathy helps relationships with customers or colleagues.', zh: '共情能力有助于与客户或同事的关系。', ja: '共感能力が顧客や同僚との関係に役立ちます。', es: 'La empatía ayuda en las relaciones con clientes o colegas.' },
    ],
    low: [
      { ko: '업무 중 감정적인 반응을 자제하세요.', en: 'Refrain from emotional reactions during work.', zh: '工作中克制情绪反应。', ja: '仕事中の感情的な反応は控えてください。', es: 'Abstente de reacciones emocionales durante el trabajo.' },
      { ko: '비판을 개인적으로 받아들이지 마세요. 성장의 기회로 삼으세요.', en: 'Do not take criticism personally. Use it as an opportunity for growth.', zh: '不要把批评当作人身攻击。作为成长的机会。', ja: '批判を個人的に受け取らないでください。成長の機会としてください。', es: 'No tomes las críticas personalmente. Úsalas como oportunidad de crecimiento.' },
      { ko: '명확한 경계를 설정하세요. 번아웃을 조심하세요.', en: 'Set clear boundaries. Watch out for burnout.', zh: '设定明确的界限。注意倦怠。', ja: '明確な境界を設定してください。バーンアウトに注意してください。', es: 'Establece límites claros. Cuidado con el agotamiento.' },
    ],
  },
  health: {
    high: [
      { ko: '정서적 안정이 신체 건강에 긍정적 영향을 줍니다.', en: 'Emotional stability positively affects physical health.', zh: '情绪稳定对身体健康有积极影响。', ja: '情緒的な安定が身体の健康に良い影響を与えます。', es: 'La estabilidad emocional afecta positivamente la salud física.' },
      { ko: '물가에서의 활동이 치유의 힘을 줍니다.', en: 'Activities near water give healing power.', zh: '在水边的活动给予治愈的力量。', ja: '水辺での活動が癒しの力を与えます。', es: 'Las actividades cerca del agua dan poder de sanación.' },
      { ko: '명상과 휴식이 몸과 마음을 회복시킵니다.', en: 'Meditation and rest restore body and mind.', zh: '冥想和休息恢复身心。', ja: '瞑想と休息が体と心を回復させます。', es: 'La meditación y el descanso restauran cuerpo y mente.' },
    ],
    medium: [
      { ko: '감정 상태가 건강에 영향을 줍니다. 스트레스 관리를 하세요.', en: 'Emotional state affects health. Manage stress.', zh: '情绪状态影响健康。管理压力。', ja: '感情状態が健康に影響を与えます。ストレス管理をしてください。', es: 'El estado emocional afecta la salud. Maneja el estrés.' },
      { ko: '충분한 수분 섭취가 특히 중요합니다.', en: 'Sufficient hydration is especially important.', zh: '充足的水分摄入尤为重要。', ja: '十分な水分摂取が特に重要です。', es: 'La hidratación suficiente es especialmente importante.' },
      { ko: '수영이나 수중 운동이 좋은 효과를 줍니다.', en: 'Swimming or water exercises give good effects.', zh: '游泳或水中运动效果很好。', ja: '水泳や水中運動が良い効果を与えます。', es: 'Nadar o ejercicios acuáticos dan buenos efectos.' },
    ],
    low: [
      { ko: '감정적 스트레스가 몸에 영향을 줄 수 있습니다. 이완하세요.', en: 'Emotional stress may affect your body. Relax.', zh: '情绪压力可能影响身体。放松一下。', ja: '感情的なストレスが体に影響を与える可能性があります。リラックスしてください。', es: 'El estrés emocional puede afectar tu cuerpo. Relájate.' },
      { ko: '수면의 질에 주의하세요. 충분히 쉬세요.', en: 'Pay attention to sleep quality. Rest enough.', zh: '注意睡眠质量。充分休息。', ja: '睡眠の質に注意してください。十分に休んでください。', es: 'Presta atención a la calidad del sueño. Descansa lo suficiente.' },
      { ko: '우울감이 들면 전문가의 도움을 받는 것도 좋습니다.', en: 'If feeling depressed, seeking professional help is also good.', zh: '如果感到忧郁，寻求专业帮助也是好的。', ja: 'うつ気分になったら専門家の助けを求めることも良いでしょう。', es: 'Si te sientes deprimido, buscar ayuda profesional también es bueno.' },
    ],
  },
  money: {
    high: [
      { ko: '직감이 재정적 결정에 도움이 됩니다. 느낌을 믿으세요.', en: 'Intuition helps with financial decisions. Trust your feelings.', zh: '直觉有助于财务决定。相信感觉。', ja: '直感が財政的な決定に役立ちます。感覚を信じてください。', es: 'La intuición ayuda con decisiones financieras. Confía en tus sentimientos.' },
      { ko: '예술이나 창작 활동이 수입으로 이어질 수 있습니다.', en: 'Art or creative activities can lead to income.', zh: '艺术或创作活动可以带来收入。', ja: '芸術や創作活動が収入につながる可能性があります。', es: 'El arte o actividades creativas pueden conducir a ingresos.' },
      { ko: '타인을 돕는 활동이 풍요를 가져옵니다.', en: 'Helping others brings abundance.', zh: '帮助他人带来丰富。', ja: '他人を助ける活動が豊かさをもたらします。', es: 'Ayudar a otros trae abundancia.' },
    ],
    medium: [
      { ko: '감정적으로 지출하는 것을 경계하세요.', en: 'Beware of emotional spending.', zh: '警惕情绪化消费。', ja: '感情的に支出することに注意してください。', es: 'Cuidado con el gasto emocional.' },
      { ko: '재정 상황을 냉정하게 평가하세요.', en: 'Evaluate your financial situation calmly.', zh: '冷静评估财务状况。', ja: '財政状況を冷静に評価してください。', es: 'Evalúa tu situación financiera con calma.' },
      { ko: '기부나 나눔이 마음의 풍요를 가져옵니다.', en: 'Donation or sharing brings richness of heart.', zh: '捐赠或分享带来心灵的丰富。', ja: '寄付や分かち合いが心の豊かさをもたらします。', es: 'La donación o compartir trae riqueza del corazón.' },
    ],
    low: [
      { ko: '감정적인 상태에서 큰 재정 결정을 피하세요.', en: 'Avoid big financial decisions in emotional states.', zh: '避免在情绪状态下做重大财务决定。', ja: '感情的な状態で大きな財政決定を避けてください。', es: 'Evita grandes decisiones financieras en estados emocionales.' },
      { ko: '타인에게 과도하게 베푸는 것에 주의하세요.', en: 'Be careful about giving too much to others.', zh: '注意不要过度给予他人。', ja: '他人に過度に与えることに注意してください。', es: 'Ten cuidado de no dar demasiado a otros.' },
      { ko: '현실적인 재정 계획을 세우세요. 꿈과 현실의 균형이 필요합니다.', en: 'Make a realistic financial plan. Balance between dreams and reality is needed.', zh: '制定现实的财务计划。需要梦想与现实的平衡。', ja: '現実的な財政計画を立ててください。夢と現実のバランスが必要です。', es: 'Haz un plan financiero realista. Se necesita equilibrio entre sueños y realidad.' },
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
