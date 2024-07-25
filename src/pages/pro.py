import codecs
result = []
with codecs.open('Communes_sep_tab.txt', 'r', encoding = 'utf-8') as fh:
    x = fh.readlines()
mydict = {}
for i in x:
    s = i.split('\t')
    mydict[s[0]] = s[1]
print(mydict)