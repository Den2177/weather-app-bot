require: slotfilling/slotFilling.sc
  module = sys.zb-common
theme: /

    state: Start
        q!: $regex</start>
        a: Привет, я электронный помощник. Скажи погода, чтобы узнать погоду в твоем городе. Если хочешь узнать твое текущее время скажи время
    state: Weather
        intent!: /погода,
        a: Назови город в котором ты находишься
    state: GetCity
        intent: /город || fromState = "/Weather", onlyThisState = true
        a: Ищу город
    state: NoMatch || noContext = true
        event!: noMatch
        a: Я тебя не понял, пожалуйста, повтори фразу