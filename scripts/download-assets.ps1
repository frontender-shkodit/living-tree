$ErrorActionPreference = 'Stop'
$assetRoot = Join-Path $PSScriptRoot '../public/assets/figma'
New-Item -ItemType Directory -Force -Path $assetRoot | Out-Null
$assets = @'
[
  {
    "name": "imgTelegram",
    "url": "https://www.figma.com/api/mcp/asset/b895a70b-70de-421c-8c50-ffe2d4ce0795.svg",
    "file": "telegram.svg"
  },
  {
    "name": "imgVk",
    "url": "https://www.figma.com/api/mcp/asset/bd94b558-d649-45e2-a28c-dd9edf9fffe6.svg",
    "file": "vk.svg"
  },
  {
    "name": "imgInst",
    "url": "https://www.figma.com/api/mcp/asset/7a8df54c-2398-4ffb-8042-521350198066.svg",
    "file": "inst.svg"
  },
  {
    "name": "imgIcon9",
    "url": "https://www.figma.com/api/mcp/asset/cf18eef5-8e69-4d85-aa96-0f4335923646.svg",
    "file": "icon9.svg"
  },
  {
    "name": "imgIconSpray",
    "url": "https://www.figma.com/api/mcp/asset/edc8a187-73b2-4b34-9d91-2fc8bfede88c.svg",
    "file": "icon-spray.svg"
  },
  {
    "name": "imgAngleRight",
    "url": "https://www.figma.com/api/mcp/asset/cc55d4ee-4c72-46f5-ba6a-f5214e928aaa.svg",
    "file": "angle-right.svg"
  },
  {
    "name": "imgTypeSecondary",
    "url": "https://www.figma.com/api/mcp/asset/f947a246-e707-40c8-af3e-9a08f99996cf.svg",
    "file": "type-secondary.svg"
  },
  {
    "name": "imgTypePrimary",
    "url": "https://www.figma.com/api/mcp/asset/c7bb9c44-7b6d-49b1-956e-186ffc45a6a4.svg",
    "file": "type-primary.svg"
  },
  {
    "name": "imgEllipse3",
    "url": "https://www.figma.com/api/mcp/asset/64690bb8-9fbf-44e5-b9c5-aacbb74a0d18.svg",
    "file": "ellipse3.svg"
  },
  {
    "name": "imgPhoto",
    "url": "https://www.figma.com/api/mcp/asset/12120ba5-7b97-48e3-8ed3-9d69d3c1c3e3.png",
    "file": "photo.png"
  },
  {
    "name": "imgPhoto1",
    "url": "https://www.figma.com/api/mcp/asset/798af954-0d96-45a6-a557-9e729c838e3c.png",
    "file": "photo1.png"
  },
  {
    "name": "imgPhoto2",
    "url": "https://www.figma.com/api/mcp/asset/23b215f5-f70b-4111-bcd7-630982f072a9.png",
    "file": "photo2.png"
  },
  {
    "name": "imgPhoto3",
    "url": "https://www.figma.com/api/mcp/asset/06718915-cc22-40a9-ad22-5292c02ddf56.png",
    "file": "photo3.png"
  },
  {
    "name": "imgPhoto4",
    "url": "https://www.figma.com/api/mcp/asset/9ab2fb5a-ad64-40c4-b684-645e122fa04f.png",
    "file": "photo4.png"
  },
  {
    "name": "imgPhoto5",
    "url": "https://www.figma.com/api/mcp/asset/a77f6b13-c94b-4751-9ea0-a525ef3b7434.png",
    "file": "photo5.png"
  },
  {
    "name": "imgPhoto6",
    "url": "https://www.figma.com/api/mcp/asset/39e1e928-02a1-4fa2-be1a-f76b0e7f76f2.png",
    "file": "photo6.png"
  },
  {
    "name": "imgPhoto7",
    "url": "https://www.figma.com/api/mcp/asset/efafee35-ea3c-4d79-ad66-3983c8dc5e16.png",
    "file": "photo7.png"
  },
  {
    "name": "imgPhoto8",
    "url": "https://www.figma.com/api/mcp/asset/c16fa73d-1fa2-4069-b6ca-a8d20c7781cd.png",
    "file": "photo8.png"
  },
  {
    "name": "imgPhoto9",
    "url": "https://www.figma.com/api/mcp/asset/bcf42f7d-0a5a-4f87-8bfe-bab2ad64ddcc.png",
    "file": "photo9.png"
  },
  {
    "name": "imgVector2",
    "url": "https://www.figma.com/api/mcp/asset/638cb306-e1f0-47ee-a489-e37beecb4978.png",
    "file": "vector2.png"
  },
  {
    "name": "imgInst1",
    "url": "https://www.figma.com/api/mcp/asset/e93dbf9a-139f-40b8-9327-2a4de2ce326b.svg",
    "file": "inst1.svg"
  },
  {
    "name": "imgVk1",
    "url": "https://www.figma.com/api/mcp/asset/10156900-fd34-40db-bf01-59d3831a4ea5.svg",
    "file": "vk1.svg"
  },
  {
    "name": "imgTelegram1",
    "url": "https://www.figma.com/api/mcp/asset/cb1f9142-17a1-433e-949a-91bdd3fbf49d.svg",
    "file": "telegram1.svg"
  },
  {
    "name": "imgLogo",
    "url": "https://www.figma.com/api/mcp/asset/a02d0e28-e6f3-48f8-8bb2-e00b4a062f67.svg",
    "file": "logo.svg"
  },
  {
    "name": "imgEllipse4",
    "url": "https://www.figma.com/api/mcp/asset/594acf36-74bd-401f-92eb-38db57cf18d3.svg",
    "file": "ellipse4.svg"
  },
  {
    "name": "imgRaiting",
    "url": "https://www.figma.com/api/mcp/asset/1e8c1c18-4092-4005-a1c8-a274df7c5c55.svg",
    "file": "raiting.svg"
  },
  {
    "name": "imgIconNotSun",
    "url": "https://www.figma.com/api/mcp/asset/ef28c474-d4b7-4c04-9577-6256f870363f.svg",
    "file": "icon-not-sun.svg"
  },
  {
    "name": "imgIconWatering",
    "url": "https://www.figma.com/api/mcp/asset/9e14d423-5aaf-4792-8116-df20d29f0ffa.svg",
    "file": "icon-watering.svg"
  },
  {
    "name": "imgVector",
    "url": "https://www.figma.com/api/mcp/asset/0689da22-143d-4c6b-bffe-e22e46de4328.svg",
    "file": "vector.svg"
  },
  {
    "name": "imgSticker",
    "url": "https://www.figma.com/api/mcp/asset/073db29f-40a0-4c37-af6b-239dd1299f24.svg",
    "file": "sticker.svg"
  },
  {
    "name": "imgSticker1",
    "url": "https://www.figma.com/api/mcp/asset/35a62b87-916f-44f8-a74b-b5b35523a4cd.svg",
    "file": "sticker1.svg"
  },
  {
    "name": "imgVector1",
    "url": "https://www.figma.com/api/mcp/asset/e14f05bf-1e63-4f0d-a381-a8de25abb994.svg",
    "file": "vector1.svg"
  },
  {
    "name": "imgIcon10",
    "url": "https://www.figma.com/api/mcp/asset/2329101f-05c1-45fc-950c-613c5f6382df.svg",
    "file": "icon10.svg"
  },
  {
    "name": "imgIcon11",
    "url": "https://www.figma.com/api/mcp/asset/a2022e85-9d5c-4ed6-bff1-0d667950880a.svg",
    "file": "icon11.svg"
  },
  {
    "name": "imgIcon12",
    "url": "https://www.figma.com/api/mcp/asset/8147e1d0-0714-49fc-a760-d17bbe6f36de.svg",
    "file": "icon12.svg"
  },
  {
    "name": "imgVector3",
    "url": "https://www.figma.com/api/mcp/asset/5ffbfb49-729b-41b7-a595-be07e7e750aa.svg",
    "file": "vector3.svg"
  },
  {
    "name": "imgLogo1",
    "url": "https://www.figma.com/api/mcp/asset/abbd7d6b-794d-4ee6-8cdc-9f06aad268a6.svg",
    "file": "logo1.svg"
  }
]
'@ | ConvertFrom-Json
foreach ($asset in $assets) {
  Invoke-WebRequest -Uri $asset.url -OutFile (Join-Path $assetRoot $asset.file) -UseBasicParsing
}
Get-ChildItem $assetRoot | Select-Object Name, Length
