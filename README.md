![tenor](https://user-images.githubusercontent.com/1079931/122724068-af853680-d2c7-11eb-880c-29de18b054e3.gif)


# Morph!
Morph is a component langauge that compiles to your platform

When writing in morph your feature set changes based on your name and what files your allowed to import

when you import a morph file ie

```
files in dir

myComponent.dom.morph
myComponent.htl.morph
myComponent.morph

import myComponent from './myComponent.morph'

compiling to react:

it would first try to load myComponent.react.morph, since thats not avalible it moves up.

its see if theres dom, there is so it loads this one.

compiling to htl:
it checks to see if there is a myComponent.htl.morph so it uses that.

compiling to reactNative:
it checks to see if there a reactNative, there isnt and it keep checking till it gets to myComponent.morph, if this wasnt here it would throw an error that it couldnt build to reactNative do to missing reactNative.



current Hierarchy

htl -> dom -> primatives -> root
react --^       ^
react-native ---^
```

Morph is going to have a very strict built in linter. This is because morph code is design to be edited by external editors and be read by different dev tools.
