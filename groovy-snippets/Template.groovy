def evalTemplate(templateText, params) {
    def engine = new groovy.text.GStringTemplateEngine()
    return engine.createTemplate(templateText).make(params).toString()
}

println evalTemplate('''
test1: ${foo}
test2: ${bar}
''', [
    foo: 'ほげ',
    bar: 'フガ',
])
