from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "og.png"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

background = "#F4F2ED"
text = "#111216"
soft = "#61656F"
line = "#D7D4CC"
accent = "#2457E6"

image = Image.new("RGB", (1200, 630), background)
draw = ImageDraw.Draw(image)

label = ImageFont.truetype(FONT_BOLD, 20)
name = ImageFont.truetype(FONT_BOLD, 94)
role = ImageFont.truetype(FONT_REGULAR, 42)
meta = ImageFont.truetype(FONT_REGULAR, 23)

draw.text((74, 62), "TEMPE, ARIZONA  /  OPEN TO RELOCATE", font=label, fill=soft)
draw.ellipse((527, 68, 539, 80), fill=accent)

draw.text((70, 170), "Harsh Dobariya", font=name, fill=text, stroke_width=0)
draw.text((75, 292), "Software Engineer", font=role, fill=text)
draw.text((75, 360), "BACKEND SYSTEMS  /  FULL-STACK PRODUCTS", font=label, fill=accent)

draw.line((75, 486, 1125, 486), fill=line, width=2)
draw.ellipse((280, 481, 290, 491), fill=accent)
draw.ellipse((660, 481, 670, 491), fill=accent)
draw.ellipse((1028, 481, 1038, 491), fill=accent)

draw.text((75, 526), "C++  ·  TYPESCRIPT  ·  NODE.JS  ·  SQL", font=meta, fill=soft)
draw.text((843, 526), "harshdobariya.com", font=meta, fill=text)

image.save(OUTPUT, format="PNG", optimize=True)
print(OUTPUT)
