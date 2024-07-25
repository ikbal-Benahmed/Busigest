import codecs
result = []
with codecs.open('Communes_sep_tab.txt', 'r', encoding = 'utf-8') as fh:
    x = fh.readlines()
for s in x :
    number = s.split('\t')[0]  
    wilaya = s.split('\t')[1]  
    result.append('<Picker.Item label ="'+number+' - ' +wilaya+'" value = "'+number+'"/>')
for x in result : 
    print(x)