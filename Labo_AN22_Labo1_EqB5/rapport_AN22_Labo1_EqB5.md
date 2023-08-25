# Mini Rapport Labo 1 - Encodage de nombres réels
### Cours de Mathématiques spécifiques II - Mars 2022
### Equipe 5: Alessio Comi, Benjamin Mouchet, Guillaume Mouchet
---
## Contexte
L'objectif principal de ce laboratoire est d'encoder un type float sur un nombre variable de bits avec: un bit de signe, un exposant et une mantisse.
## Méthode
Dans un premier temps, afin de nous familiariser avec l'encodage sur 32 bits d'un flottant, nous nous sommes aidés du site https://www.h-schmidt.net/FloatConverter/IEEE754.html afin de valider nos résultats sur papier.

Le premier problème rencontré dans l'encodage d'un float est de définir le nombre de bits nécessaires pour encoder l'exposant. Nous nous sommes basés sur un standard de l'IEEE (2008, p. 13) sur les nombres flottants. Celui-ci définit une taille pour un nombre de bits de: 16, 32, 64 et 128. De plus, il fournit une formule dans le cas où le nombre de bits à disposition est au-dessus de 128: round(4*log2(k)) - 13. Pour déterminer la taille où les bits à disposition sont entre 1 et 127, nous avons fait une régression quadratique sur Wolfram Alpha. Cela nous a sorti une équation afin de pouvoir calculer les bits nécessaires pour l'exposant: -0.000588038 x^2 + 0.171371 x + 2.66667. Nous avons fixé une valeur minimale d'encodage à 7 bits, ce qui laisse: 1 bit de signe, 4 d'exposant et 2 de mantisse. Pour encoder la valeur de la mantisse, nous sommes partis de l'équation suivante: float = 2^e * mantisse / 2^(m+1). Nous avons ensuite isolé mantisse et converti cette valeur en binaire. 

Nous constatons que notre méthode d'encodage ne fonctionne que jusqu'à 83 bits. Au-delà de cette limite, l'encodage est erronné. Nous n'avons pas réussi à déterminer la cause de ce problème. Le décodage de nombres puissances de 2 posait un problème. Une solution rapide a été trouvée: nous multiplions le résultat par 2 pour arriver à nouveau sur la bonne valeur. 

Nous avons ensuite essayé d'implémenter de l'addition. Elle fonctionne uniquement lorsque l'on ajoute deux nombres du même signe. Malgré les exemples du cours et l'aide de la page Wikipédia (2022) sur l'arithmétique des nombres flottants, nous n'avons pas réussi à implémenter l'addition entre un float négatif et un autre positif. 

## Conclusion
Le code réalisé permet d'encoder et décoder des floats sur une longueur comprise dans l'intervalle [7;83]. En dessous de 7 la mantisse, d'une longueur de 2, n'est pas assez précise. En dessus de 83, l'encodage ne fonctionne pas et nous n'avons pas réussi à déterminer la cause du problème. L'utilisateur peut entrer les valeurs à dé/coder ainsi que la longueur de bits souhaitée. L'implémentation de l'addition est partielle, nous ne pouvons pas additionner des nombres de signes différents.
## Références

AUTHEUR INCONNU, DATE INCONNUE. _IEEE-754 Floating Point Converter_ [en ligne]. Date inconnue. [Consulté le 22 mars 2022]. Disponible à l’adresse : https://www.h-schmidt.net/FloatConverter/IEEE754.html

IEEE, 2008. _IEEE Standard for Floating-Point
Arithmetic_ [En ligne]. Révision du standard 754-1985. New York: IEEE, 29 aout 2008. IEEE Std 754™-2008. [Consulté le 20 mars 2022]. Disponible à l’adresse : https://irem.univ-reunion.fr/IMG/pdf/ieee-754-2008.pdf

Floating-point arithmetic, 2022. In : _Wikipédia : l’encyclopédie libre_ [en ligne]. Dernière modification de la page le 7 mars 2022 à 09:03. [Consulté le 22 mars 2022]. Disponible à l’adresse : http://fr.wikipedia.org/w/index.php?title=D%C3%A9veloppement_durable&oldid=97051944



