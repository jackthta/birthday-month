<!--  anchor for `back to top` -->
<a name="readme-top"></a>

<br />

<!-- HEADER -->
<div align="center">
  <a href="https://github.com/jackthta/birthday-month">
    <img src="./public/birthday-cake-logo.png" alt="birthday-cake-calendar-logo" width="100">
  </a>

  <h1 align="center">Employee Birthday Month List</h3>
  <p align="center">
    Convert a list of employees to a list of employees that have a birthday this month.
  </p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
## **Table of Contents**
<ol>
<li>
    <a href="#about-the-project">About The Project</a>
    <ul>
    <li><a href="#built-with">Built With</a></li>
    </ul>
</li>
<li>
    <a href="#getting-started">Getting Started</a>
    <ul>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    </ul>
</li>
<li><a href="#usage">Usage</a></li>
<li><a href="#tests">Tests</a></li>
<li><a href="#roadmap">Roadmap</a></li>
<li><a href="#license">License</a></li>
</ol>

<br />

<!-- ABOUT THE PROJECT -->
## **About The Project**
This web application accepts a CSV file of employees and parses that list to output a list of employees that have a birthday this month. The generated list can be exported into a new CSV file.

<br />

### Built With
- [![Vue][vue-badge]][vue-url]
- [![TypeScript][typescript-badge]][typescript-url]
- [![Vite][vite-badge]][vite-url]
- [![TailwindCSS][tailwindcss-badge]][tailwindcss-url]
- [![Playwright][playwright-badge]][playwright-url]

<br />

<!-- GETTING STARTED -->
## **Getting Started**
Follow these steps to run the application locally.

### Prerequisites
- [NodeJS](https://nodejs.org/en/) (v16.x)
- [pnpm](https://pnpm.io/) (v7.x)

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/jackthta/birthday-month.git
   ```
2. Change into project directory
   ```sh
   cd birthday-month
   ```
3. Install dependencies
   ```sh
   pnpm i
   ```
4. Launch the application
   ```sh
   pnpm dev
   ```

<br />

<!-- USAGE EXAMPLES -->
## **Usage**

### Format
The CSV file of employees needs to be a specific format:
```
name,birthday
...
```
- The birthday needs to be wrapped with double quotes and can be in any format that is accepted by the `Date` constructor.

Example:

```
name,birthday
Dennis Ritchie,"January 01, 1970"
Ken Thompson,"January 01, 1970"
...
```
- For clarity, the CSV header `name,birthday` is required as the first row of the file. The subsequent rows can be filled as necessary; they just have to follow the header format (Dennis Ritchie and Ken Thompson entries are examples).

### CSV File Generator
If you'd like, you can conveniently use this [online generator](https://generatedata.com/generator) to generate a CSV file of imaginary employees. Please be sure to have the format as `CSV` and the first two row inputs as a `Names` and `Date` data type, respectively.

<br />

<!-- TESTS -->
## **Tests**
The testing tool used in this project is Playwright. The documentation can be found [here](https://playwright.dev/docs/writing-tests).

### Requirements
**There are two required files that need to exist in the `employee_data` directory before you run the test suite.** These files are used in the test suite to test against (test-generated) files or the UI.
1. `employee_data.csv`
   - The original CSV file of employees.
2. `employee_${THIS_MONTH}_birthdays.csv`
   - The CSV file that you exported from the application (contains list of employees that have a birthday this month).

### Start test
To run the test suite located in the `tests` directory, run this command:
```
pnpm test
```

<br />

<!-- ROADMAP -->
## **Roadmap**
- [x] Scaffold project layout, tools, configuration <sup>(Sep 21, 2022)</sup>
- [x] Build base functionality <sup>(Sep 22, 2022)</sup>
- [x] Style layout <sup>(Sep 25, 2022)</sup>
- [x] End-to-end test with Playwright <sup>(Sep 26, 2022)</sup>
- [x] Create `README.md` and polish <sup>(Sep 27, 2022)</sup>

<br />

<!-- LICENSE -->
## **License**
Distributed under the MIT License. See `LICENSE.md` for more information.

<br />

<p align="right">(<a href="#readme-top"> 🔺 back to top </a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-badge]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[vue-badge]: https://img.shields.io/badge/Vue-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[typescript-badge]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vite-badge]: https://img.shields.io/badge/vite-252524?style=for-the-badge&logo=vite&logoColor=FECC25
[vite-url]: https://vitejs.dev/
[tailwindcss-badge]: https://img.shields.io/badge/tailwindcss-0A1121?style=for-the-badge&logo=tailwindcss&logoColor=36BCF9
[tailwindcss-url]: https://tailwindcss.com/
[playwright-badge]: https://img.shields.io/badge/playwright-252426?style=for-the-badge&logo=playwright&logoColor=44BB4B
[playwright-url]: https://playwright.dev/
