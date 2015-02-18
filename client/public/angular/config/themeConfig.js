angular.module('themeConfig', [])
.config(['$mdThemingProvider',function($mdThemingProvider) {
      // Theme Hex Values:
      // primary - E5DFC5
      // accent - 91C7A9
      // warn - A92F41
      // background - 252120

  $mdThemingProvider.definePalette('soggyPrimary', {
      '50':   "EFECDC",
      '100':  "EDE9D6",
      '200':  "EAE5D1",
      '300':  "E8E2CB",
      '400':  "E5DFC5",
      '500':  "CEC9B1",
      '600':  "B7B29E",
      '700':  "A09C8A",
      '800':  "898676",
      '900':  "727062",
      'A100': "5C594F",
      'A200': "45433B",
      'A400': "2E2D27",
      'A700': "171614",
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

  $mdThemingProvider.definePalette('soggyAccent', {
      '50'  :    "C8E3D4",
      '100' :    "BDDDCB",
      '200' :    "B2D8C3",
      '300' :    "A7D2BA",
      '400' :    "9CCDB2",
      '500' :    "91C7A9",
      '600' :    "82B398",
      '700' :    "749F87",
      '800' :    "668B76",
      '900' :    "577765",
      'A100':    "486454",
      'A200':    "3A5044",
      'A400':    "2C3C33",
      'A700':    "1D2822",
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.definePalette('soggyWarn', {
      '50'  :    "D497A0",
      '100' :    "CB828D",
      '200' :    "C36D7A",
      '300' :    "BA5967",
      '400' :    "B24454",
      '500' :    "A92F41",
      '600' :    "982A3A",
      '700' :    "872634",
      '800' :    "76212E",
      '900' :    "651C27",
      'A100':    "541820",
      'A200':    "44131A",
      'A400':    "330E14",
      'A700':    "22090D",
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider.definePalette('soggyBackground', {
        '50'  :    "A8A6A6",
        '100' :    "929090",
        '200' :    "7C7A79",
        '300' :    "666463",
        '400' :    "514D4D",
        '500' :    "3B3736",
        '600' :    "252120",
        '700' :    "211E1D",
        '800' :    "1E1A1A",
        '900' :    "1A1716",
        'A100':    "161413",
        'A200':    "121010",
        'A400':    "0F0D0D",
        'A700':    "0B0A0A",
        'contrastDefaultColor': 'dark',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': undefined,
        'contrastLightColors': ['500', '700', '800',
       '900', 'A100', 'A200']
      });
      $mdThemingProvider.theme('default')
      .primaryPalette('soggyPrimary', {
        'default': '400'
      })

      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('soggyAccent', {
        'default': '500' // use shade 200 for default, and keep all other shades the same
      })

      .warnPalette('soggyWarn', {
        'default': '500' // use shade 200 for default, and keep all other shades the same
      })

      .backgroundPalette('soggyBackground', {
        'default': '600', // use shade 200 for default, and keep all other shades the same
      });
}]);
