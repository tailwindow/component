# Tailwindow Component

Tailwindow is a component viewer and collection of Tailwind CSS. This project aim to make developer can easily manage their component to be used on their project.

## Component Folder Structure

All collection is on `public/template/component/<themes>/<group>/<component-name>`. All component under `themes` sub directory should use the same css file from themes folder. for example can be seen on `public/template/component/tailwindcss`.

## Roadmap

Currently this project still on early access, and we will add much more component collection under `tailwindcss` directory, this collection is using standard Tailwind CSS class utilities, so everyone can make their own themes later using this collection

For current development roadmap can be seen here [https://github.com/tailwindow/component/projects](https://github.com/tailwindow/component/projects)

## Contributing

If you want to help us to make more component available for everyone you can make a pull request to this project, and since english is not my main language you are welcome to make a PR to fix the grammar :)

*NOTES: because i purge the css file in tailwindcss folder please build a new css file from folder `public/template/component/tailwindcss` using command `yarn build` to enable all available Tailwind CSS utitities class when developing new component*