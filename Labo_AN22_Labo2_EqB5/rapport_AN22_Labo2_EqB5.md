# Mini Rapport Labo 2 - Encodage de nombres réels
### Cours de Mathématiques spécifiques II - Avril 2022
### Equipe 5: Alessio Comi, Benjamin Mouchet, Guillaume Mouchet
---
## Contexte
Dans le cadre de ce laboratoire nous voulons déterminer les racines entre -100 et 100 de deux fonctions: sin(x) -x/13 et x/(1-x^2). Nous avons décidé de travailler avec la méthode de dichotomie afin de déterminer les zéros de la fonction. Une fois ces résultats obtenus, nous les avons comparés aux valeurs réelles des fonctions afin de déterminer le taux d'erreur.

## Méthode
Dans un premier temps, nous avons décidé de nous familiariser avec les fonctions sur lesquelles nous avons travaillées. Pour ce faire, nous les avons représentées sur Wolfram Alpha (2022).

Nous avons ensuite déterminé l'erreur machine. Grâce à la documention Mozilla (2022 MDN contributors), nous avons trouvé que cette valeur n'a pas besoin d'être calculée, c'est une variable existante en javascript: Number.EPSILON. Elle vaut 2^-52.

Afin d'exploiter la méthode de la dichotomie, nous avons besoin d'établir les bornes gauche et droite.
Le théorème de Bolzano nous dit que si une fonction est continue entre a et b et qu'elle change de signe, alors elle a forcément au moins une racine dans cet intervalle. Afin de déterminer les différents intervalles, nous nous sommes inspirés du post de Eklavya Chopra sur le site d'OpenGenus (2019). Nous avons posé une boucle for avec a = -100 et b = -99. Nous regadons ensuite si f(a)*f(b) <= 0. Si c'est le cas, nous pouvons travailler avec ces bornes afin de déterminer des racines, sinon nous incrémentons a et b de 1, jusqu'à arriver à 100. Nous pouvons ensuite utiliser ces bornes dans le second algorithme sur la dichotomie vue en cours.
Cette méthode comporte des failles si:

1. La fonction touche l'abscisse sans la traverser, comme pour la fonction x^2 par exemple.
2. Si la fonction n'est pas continue.
3. S'il existe plusieurs zéros dans l'intervalle choisie.

Afin de pallier au problème 2 dans le cas de la fonction x/(1-x^2) qui présente deux asymptotes en -1 et 1, nous nous assurons que notre zéro évalué dans la fonction est entre -1 et 1. Si ces zéros sont des asymptotes verticales, nous tendons vers +/- l'infini. Nous avions voulu travailler avec la valeur Infinity définie en javascript, or commme nous ne tombons pas exactement sur les -1 et 1, cette méthode ne fonctionne pas.
Le problème 3 a été résolu en regardant sur WolframAlpha la fonction. De là nous pouvons voir qu'il n'existe pas plusieurs zéros dans notre fenêtre de taille 1, définie par la boucle entre -100.1 et -99.1 plus haut.
Il reste donc le problème 1 qui n'est pas possible de résoudre directement sans mettre les bornes de cette valeur en dur.

Afin de déterminer le taux d'erreur, nous avons comparé les zéros sur les pages de nos fonctions sur WolframAlpha. Dans un premier temps nous nous sommes assurés d'avoir le bon nombre de racines. Puis nous avons fait une moyenne sur les écarts en les points calculés et les points tirés du site.

Pour l'affichage des fonctions, nous sommes repartis du code graph2d de jithunni.ks (2020).

## Conclusion

Notre laboratoire permet bien de calculer les racines des fonctions sin(x) -x/13 et x/(1-x^2) ainsi que de calculer l'erreur sur ces résultats. En revanche, si nous venions à rajouter une nouvelle fonction qui touche l'abscisse à la place de la traverser, notre méthode ne fonctionne pas sans ajouter des valeurs en dur. Un autre problème se présenterais si cette nouvelle fonction a plusieurs racines dans un intervalle de 1. Il est néanmoins facile à résoudre, il suffit de réduire la taille de la fenêtre de recherche des bornes. Il est important de noter que tous nos résultats sont basés sur une architecture 64 bits et non 32 à cause de la définition d'epsilon.

## Références

EKLAVY CHOPRA, 2019. Bisection Method for finding the root of any polynomial. In: _Opengenus_ [en ligne]. Dernière modification de la page le 10 septembre 2019. [Consulté le 10 avril 2022]. Disponible à l’adresse : https://iq.opengenus.org/bisection-method-root-finding/

JITHUNNI.KS, 2020. 2g graph. In: _p5JS_ [en ligne]. Dernière modifiction de la page le 19 décembre 2020. [Consulté le 10 avril 2022]. Disponible à l'adresse: https://editor.p5js.org/jithunni.ks/sketches/hsjmQ_Kwl

MDN CONTRIBUTORS, 2022. Number.EPSILON. In : _mdn web docs_ [en ligne]. Dernière modification de la page le 4 février 2022. [Consulté le 10 avril 2022]. Disponible à l’adresse : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON

WOLFRAMALPHA, 2022. sin(x)-x/13. In: _WolframAlpha Computational Intelligence_ [en ligne]. Date de mise en ligne inconnue. [Consulté le 10 avril 2022]. Disponible à l'adresse: https://www.wolframalpha.com/input?i=sin%28x%29-x%2F13

WOLFRAMALPHA, 2022. x/(1-x^2). In: _WolframAlpha Computational Intelligence_ [en ligne]. Date de mise en ligne inconnue. [Consulté le 10 avril 2022]. Disponible à l'adresse: https://www.wolframalpha.com/input?i=x%2F%281-x%5E2%29








