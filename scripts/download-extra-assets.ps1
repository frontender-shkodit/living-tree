$ErrorActionPreference = 'Stop'
$assetRoot = Join-Path $PSScriptRoot '../public/assets/figma'
$assets = @'
[
  {
    "name": "imgMenuBurger",
    "url": "https://www.figma.com/api/mcp/asset/13873c14-215e-4513-a4b3-2ab94cefc219.svg",
    "file": "ui-menuburger.svg"
  },
  {
    "name": "imgIconCheck",
    "url": "https://www.figma.com/api/mcp/asset/a8a14e38-b429-42f2-a446-5abbabe9f874.svg",
    "file": "ui-iconcheck.svg"
  },
  {
    "name": "imgCross",
    "url": "https://www.figma.com/api/mcp/asset/0fae60a8-7151-4a50-a1a3-4a26e4179384.svg",
    "file": "ui-cross.svg"
  },
  {
    "name": "imgAngleLeft",
    "url": "https://www.figma.com/api/mcp/asset/13366bbc-e0a5-4c23-a7bb-0492c8a82d94.svg",
    "file": "ui-angleleft.svg"
  },
  {
    "name": "imgVector1",
    "url": "https://www.figma.com/api/mcp/asset/0c9b709c-6e38-4a4b-964c-5f325e15737a.png",
    "file": "mobile360-vector1.png"
  },
  {
    "name": "imgVector1",
    "url": "https://www.figma.com/api/mcp/asset/73a84c0c-d386-4396-b4e3-4e673fd66cfa.png",
    "file": "mobile480-vector1.png"
  },
  {
    "name": "imgVector1",
    "url": "https://www.figma.com/api/mcp/asset/16a9d2d5-032d-423d-a21e-b3902940a952.png",
    "file": "tablet768-vector1.png"
  }
]
'@ | ConvertFrom-Json
foreach ($asset in $assets) {
  Invoke-WebRequest -Uri $asset.url -OutFile (Join-Path $assetRoot $asset.file) -UseBasicParsing
}
