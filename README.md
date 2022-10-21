# WeWard Front-End Challenge

## Objectif

Votre objectif est d'afficher les pas effectués par un utilisateur sur un calendrier avec une vue mensuelle.

* Essayer de reproduire cette UI le plus fidèlement possible.
* L'utilisateur doit pouvoir changer de mois.
* Vous ne pouvez pas installer de dépendances/librairies

Pour récupérer les pas de l'utilisateur, vous disposez d'une function `getStepsHistory(startDate: string, endDate: string)` qui retourne une timeseries des données de pas de l'utilisateurs. Il y a plusieurs data points par jour.

```
[
    {
        "endDate": "2022-06-01T08:00:00.000+02:00",
        "startDate": "2022-06-01T07:00:00.000+02:00",
        "value": 0
    },
    {
        "endDate": "2022-06-01T09:00:00.000+02:00",
        "startDate": "2022-06-01T08:00:00.000+02:00",
        "value": 276
    },
    {
        "endDate": "2022-06-01T10:00:00.000+02:00",
        "startDate": "2022-06-01T09:00:00.000+02:00",
        "value": 154
    },
    {
        "endDate": "2022-06-01T11:00:00.000+02:00",
        "startDate": "2022-06-01T10:00:00.000+02:00",
        "value": 1190
    },
    {
        "endDate": "2022-06-01T12:00:00.000+02:00",
        "startDate": "2022-06-01T11:00:00.000+02:00",
        "value": 667
    },
    {
        "endDate": "2022-06-01T13:00:00.000+02:00",
        "startDate": "2022-06-01T12:00:00.000+02:00",
        "value": 498
    },
    ...
]
```

À noter que getStepsHistory() est une tâche longue qui peut prendre plusieurs secondes.


## installation

Suivez le React Native CLI Quickstart
https://reactnative.dev/docs/environment-setup

Puis,