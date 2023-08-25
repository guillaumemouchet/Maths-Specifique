# Mini Rapport Labo 3 - Systèmes linéaires
### Cours de Mathématiques spécifiques II - Mai 2022
### Equipe 5 : Alessio Comi, Benjamin Mouchet, Guillaume Mouchet
---
## Contexte
Le but de ce laboratoire est de résoudre un système d'équations linéaires grâce à la méthode de Gauss. Un objectif secondaire est d'optimiser les calculs afin d'y arriver dans le temps le plus court.

## Méthode
Dans un premier temps, il faut importer la matrice à évaluer. Celle-ci se trouve dans un fichier .json. La balise input de type file permet de filtrer les extensions des fichiers soumis par l'utilisateur. La fonction changeJson récupère le fichier pour ensuite aller chercher son contenu avec jsonFile.text(), il sera ensuite parsé  dans loadJsonFile() pour en faire un objet et pouvoir mieux chercher dedans. Finalement dans "onFileLoad" les différentes valeurs sont traitées et assignée à leur variable respective.

Une fois la matrice importée, nous l'avons échelonnée afin de nous retrouver avec une matrice triangulaire. Nous sommes repartis du pseudo-code de Wikipédia sur l'article concernant l'élimination de Gauss(2022). L'idée de l'algorithme est de toujours prendre comme pivot la valeur la plus élevée en valeur absolue dans la colonne. Ceci dans le but d'améliorer la stabilité numérique, surtout si la matrice contient des nombres flottants(Wikipedia 2022). Une fois le pivot choisi, nous échelonnons les rangées inférieures puis passons au prochain pivot. 

Nous nous retrouvons avec une matrice échelonnée et triangulaire. Nous pouvons passer à la résolution. Dans un premier temps nous nous assurons que la matrice a une solution en calculant son déterminant, rapide grâce à la forme triangulaire de notre matrice. Ensuite nous partons de la dernière valeur de notre matrice (x_n,n) car celle ci est connue. Nous calculons ensuite les nouvelles valeurs de B en soustrayant à chaque ligne la valeur trouvée précédemment. Nous itérons jusqu'à arriver à x_1,1. 

Il ne reste que l'affichage des réponses. Le calcul précédent calcule bien les valeurs de B, en revanche elles ne sont pas encore utilisables en tant que tel. En effet, la matrice a été échelonnée mais elle n'a pas été réduite. Il suffit de diviser par x_n,n afin d'avoir xn.

## Conclusion

Tous les tests ont été effectués sur la machine de Guillaume Mouchet qui est un Thinkpad E14.
Nous avons testé notre application avec les trois matrices à disposition sur Cyberlearn. 
Nous obtenons bien aucun résultat pour la première matrice, celle contenant que des zéros.
La deuxième matrice, une matrice 3x3 demandant un changement de ligne, nous retourne: 
|X|Values|
|-|-|
|x1|-6.327518825660091|
|x2|6.137546468401488|
|x3|1.0532837670384145|

En un temps de 0 ms.

La dernière, une matrice 400x400, nous retourne bien toutes les valeurs en des temps de:
|No|temps [ms]|
|-|-|
|1|57|
|2|46|
|3|44|
|4|43|
|5|43|
|6|58|
|7|60|
|8|48|
|9|42|
|10|42|

ce qui nous fait une moyenne de temps de 48.3 ms.

Nous n'avons pas tenté d'optimisations particulières, nous avons principalement été attentifs aux indices dans nos boucles, afin d'éviter des itérations inutiles. Nous avons aussi remplacé uniquement les valeurs de B lors de la substitution de la matrice échelonnée (contrairement à une approche mathématique où nous aurions réduit la matrice).

## Références

Gaussian elimination, 2022. In : _Wikipédia : l’encyclopédie libre_ [en ligne]. Dernière modification de la page le 16 avril 2022 à 16:07. [Consulté le 6 mai 2022]. Disponible à l’adresse : https://en.wikipedia.org/wiki/Gaussian_elimination

SAYANTANM19, 2022. p5.js | loadJSON() Function. In : _GeeksforGeeks_ [en ligne]. Dernière modification de la page le 26 mars 2020. [Consulté le 10 mai 2022]. Disponible à l’adresse : https://www.geeksforgeeks.org/p5-js-loadjson-function/








