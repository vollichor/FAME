# All Roads Lead to Rome — Project page

Self-contained static project page. Open `index.html` to preview. No build step or package installation is needed.

All four videos start muted automatically when the page opens and loop continuously. Native controls and pair controls remain available; browser-level autoplay restrictions may require pressing Play both.

## GitHub Pages

1. Upload the **contents** of this folder to the root of a GitHub repository. Keep `index.html`, `assets`, and `static` at the same level.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`, and save.
4. Use the website address shown on the Pages settings screen after deployment.

The ZIP contains the complete deployable website. `_qa` is a local validation directory and is excluded from the ZIP.

## Sources and editorial choices

- Paper title, method descriptions and Tables 1–3: supplied `4774_All_Roads_Lead_to_Rome_Fl.pdf`.
- Figures: high-resolution crops of Figures 1–3, plus original embedded images from `NeurIPS2026-demo.pptx`. PNG exports retain sharp text. SVG preserves source vectors and embedded images, not vector detail that did not exist in the source.
- Author names are not provided. The page uses Anonymous Authors and correctly labels the document as a NeurIPS 2026 submission.
- Benchmark numbers reproduce the manuscript and are not new independently validated experiments.
- The selected videos are existing NextBestPath Simple/Hard checkpoint runs. They are **not** a validated comparison between NextBestPath and the paper's proposed flow-driven method. The page preserves the requested column labels and clearly discloses actual checkpoint provenance next to the media. Replace those files and provenance text when genuine method-comparison runs are available.
- `butcher_in_the_sandstorm_15` uses the updated centered-view videos.
- No analytics, trackers or third-party scripts are included. External project links open only when clicked.

## Layout acknowledgments

Layout and style follow https://shiyao-li.github.io/nbp/ and the Nerfies project page template: https://github.com/nerfies/nerfies.github.io . Bulma and Bootstrap stylesheet headers retain their upstream license notices.

## Media

The homepage teaser uses the 5120×1780 lossless PNG `assets/images/fear_in_the_abyss_10_target70_no_roof_5K.png`. Left: a real Simple-trained NextBestPath run on the Hard scene `fear_in_the_abyss_10`, stopped at 70.04% measured coverage after a nominal 1,104 steps, without manual guidance. Right: the complete Ground Truth geometry with recorded and illustrative orthogonal room routes, not a method reconstruction. The panels share a camera and scale; ceiling points are removed for visualization only. This is an illustrative comparison with reference geometry, not an evaluation of the proposed flow-driven method. Click the homepage image to open the 5K original. The two video rows below are unchanged.

Each row contains Simple-trained NBP on the left and Hard-trained NBP on the right. Both videos are 1920×1080, 16 fps and 25 seconds, and use a 400-step exploration budget. Pair controls synchronize playback, pause, seek and restart.
