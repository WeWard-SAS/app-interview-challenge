# WeWard Front-End Challenge

## Objectif

Votre objectif est d'afficher les pas effectués par un utilisateur sur un calendrier avec une vue mensuelle.

![steps_calendar](https://user-images.githubusercontent.com/365969/197163464-a9e95d8e-e4b3-4557-bf37-3d19c42d9cbb.jpg)

* Essayez de reproduire cette UI le plus fidèlement possible.
* L'utilisateur doit pouvoir changer de mois.
* Vous ne pouvez pas installer de dépendances/librairies


Pour récupérer les pas de l'utilisateur, vous disposez d'une function `getStepsHistory(startDate: string, endDate: string)` qui retourne une timeseries des données de pas de l'utilisateur. Il y a plusieurs data points par jour.

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
À noter que l'appel à `getStepsHistory()` est une tâche longue qui peut prendre plusieurs secondes.


## Installation

Suivez le React Native CLI Quickstart
https://reactnative.dev/docs/environment-setup

## Submission

* Forker ce repo et ouvrir une pull request 
