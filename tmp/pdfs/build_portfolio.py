from pathlib import Path
import json, subprocess, re, html
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageOps
import pymupdf

ROOT=Path.cwd(); OUT=ROOT/'output/pdf/Zeyad_Salama_Project_Portfolio.pdf'
# Read the project's existing data without maintaining a second project list.
src=(ROOT/'app/page.tsx').read_text()
raw=src.split('const projects: Project[] = ')[1].split('\n\nconst experience')[0].rstrip(';')
js='const assetPath = p => p; const projects = '+raw+'; console.log(JSON.stringify(projects));'
projects=json.loads(subprocess.check_output(['node','-e',js]))
fontdir=Path('/System/Library/Fonts/Supplemental')
for n,f in [('Body','Arial.ttf'),('Bold','Arial Bold.ttf'),('Italic','Arial Italic.ttf')]: pdfmetrics.registerFont(TTFont(n,str(fontdir/f)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold',italic='Italic',boldItalic='Bold')
W,H=595.276,841.89; M=46; CW=W-2*M
INK=HexColor('#172b36'); MUTED=HexColor('#526570'); ACC=HexColor('#047c78'); PAPER=HexColor('#f5f7f5'); LINE=HexColor('#dce4e1')
c=canvas.Canvas(str(OUT),pagesize=(W,H)); c.setTitle('Zeyad Salama | Project Portfolio'); c.setAuthor('Zeyad Salama'); c.setSubject('Software engineering projects across SaaS, commerce, delivery, education, and real estate')
styles={
 'body':ParagraphStyle('body',fontName='Body',fontSize=10.5,leading=16,textColor=INK),
 'small':ParagraphStyle('small',fontName='Body',fontSize=8.5,leading=12,textColor=MUTED),
 'label':ParagraphStyle('label',fontName='Bold',fontSize=8,leading=11,textColor=ACC),
 'title':ParagraphStyle('title',fontName='Bold',fontSize=29,leading=33,textColor=INK),
}
def para(txt,x,y,width,style='body'):
 p=Paragraph(txt,styles[style]); _,h=p.wrap(width,H); p.drawOn(c,x,H-y-h); return y+h

def txt(s,x,y,size=10,font='Body',color=INK):
 c.setFillColor(color); c.setFont(font,size); c.drawString(x,H-y-size,s)

def line(y):
 c.setStrokeColor(LINE); c.setLineWidth(.7); c.line(M,H-y,W-M,H-y)

def base(num,label):
 c.setFillColor(white); c.rect(0,0,W,H,fill=1,stroke=0)
 txt('ZEYAD SALAMA',M,25,8,'Bold'); txt('PROJECT PORTFOLIO',W-M-110,25,8,color=MUTED)
 line(48); line(H-48)
 txt(label,M,H-35,8,color=MUTED)
 c.setFont('Body',8); c.setFillColor(MUTED); c.drawRightString(W-M,25,f'{num:02d} / 11')

def image(path,x,y,w,h):
 im=Image.open(path).convert('RGB'); im=ImageOps.fit(im,(int(w*2),int(h*2)),method=Image.Resampling.LANCZOS)
 c.drawImage(ImageReader(im),x,H-y-h,w,h)

def link(label,url,x,y,color=ACC):
 txt(label,x,y,9,'Bold',color); tw=pdfmetrics.stringWidth(label,'Bold',9); c.linkURL(url,(x,H-y-14,x+tw,H-y+1),relative=0,thickness=0)

def heading(s,y): return para(s,M,y,CW,'label')+9

# Cover
c.setFillColor(INK); c.rect(0,0,W,H,fill=1,stroke=0)
c.setFillColor(ACC); c.rect(M,H-76,48,5,fill=1,stroke=0)
txt('SOFTWARE ENGINEERING / NOVEMBER 2026',M,91,9,'Bold',HexColor('#9bd7ce'))
txt('Zeyad',M,137,54,'Bold',white); txt('Salama',M,196,54,'Bold',white)
txt('Project portfolio',M,278,26,'Body',white)
coverstyle=ParagraphStyle('cover',fontName='Body',fontSize=13,leading=20,textColor=HexColor('#c5d6d9'))
p=Paragraph('Backend depth. Frontend polish.<br/>Secure APIs, business systems, and product experiences across SaaS, commerce, and platforms.',coverstyle); p.wrap(CW-30,200); p.drawOn(c,M,H-337-p.height)
# A strip drawn from three existing project artworks.
for i,j in enumerate([0,4,5]): image(ROOT/'public'/projects[j]['image'].lstrip('/'),M+i*(CW/3+3),468,CW/3-2,154)
txt('09',M,649,30,'Bold',white); txt('PROJECTS & SYSTEMS',M,690,8,'Bold',HexColor('#9bd7ce'))
txt('Python / Django / PostgreSQL',M+162,657,12,'Bold',white); txt('React / Next.js / TypeScript',M+162,681,11,color=HexColor('#c5d6d9'))
link('zeyadslama23@gmail.com','mailto:zeyadslama23@gmail.com',M,751,HexColor('#9bd7ce'))
link('GitHub','https://github.com/Demo-23home',M+278,751,HexColor('#9bd7ce')); link('LinkedIn','https://www.linkedin.com/in/demo-23home/',M+352,751,HexColor('#9bd7ce'))
c.showPage()

# Overview
base(2,'Overview & project directory')
para('Systems that turn business<br/>rules into working products.',M,75,CW,'title')
para('Backend software engineer based in Egypt, specializing in Python, Django, Django REST Framework, and PostgreSQL. Work spans multi-tenant systems, financial workflows, secure identity, real-time services, and responsive interfaces.',M,164,CW)
y=255
for i,p in enumerate(projects+[{'title':'Negm Feed','label':'Invoicing, payments & reporting'}]):
 page=i+3; line(y-8); txt(f'{i+1:02d}',M,y,10,'Bold',ACC); txt(p['title'].replace(' (بيعة)',''),M+35,y,12,'Bold'); txt(p['label'],M+35,y+20,9,color=MUTED)
 c.setFont('Body',10); c.setFillColor(MUTED); c.drawRightString(W-M,H-y-12,f'{page:02d}'); y+=48
para('ABOUT THIS COLLECTION',M,706,CW,'label')
para('Includes all eight projects listed in the portfolio and the Negm Feed business software described in the résumé. Metrics reflect those source materials. Project artwork is conceptual; links open the referenced websites or app listings.',M,725,CW,'small')
c.showPage()

details=[
 [('Customization & catalogs','Built an SVG-based garment customization engine with configurable layers, placement zones, text, images, fonts, colors, materials, and sizes.'),('Commerce workflows','Implemented multi-store catalogs, inventory reservations, quantity-based pricing, promotions, group orders, deposits, and transactional payment/refund lifecycles.'),('API architecture','Applied service-layer architecture, atomic transactions, UUID identifiers, optimized ORM queries, and Swagger/ReDoc documentation.')],
 [('Discovery & booking','Developed property search, filters, ordering, pagination, media, and visit booking with owner/tenant authorization, duplicate-booking protection, and controlled status transitions.'),('Identity & real-time services','Implemented HTTP-only JWT sessions, refresh-token rotation, Argon2 hashing, rate limiting, role-based permissions, social authentication, Cloudinary media, and Redis-backed Channels.'),('Quality & performance','Optimized queries with indexes, annotations, subqueries, and eager loading. Wrote 100+ tests across permissions, listings, bookings, query efficiency, and WebSockets.')],
 [('Business operations','Combined point of sale, inventory, bookings, and online ordering in a business management SaaS for Egyptian small businesses.'),('Tenant & access boundaries','Provided tenant isolation, role-based access, local payment verification, and dedicated administration apps for businesses and the platform.'),('Language & device support','Built an Arabic-first, bilingual experience with right-to-left support and progressive web app delivery for mobile and desktop.')],
 [('Learning & assessment','Developed modular APIs for Quran content, assessments, study plans, teacher-student groups, recommendations, onboarding, and contribution workflows.'),('Secure family access','Implemented HTTP-only JWT authentication, OTP verification, password recovery, Google/Apple/Facebook OAuth, child accounts, and granular role-based permissions.'),('Content & progress','Supported 6,236 verses, hierarchical subjects, configurable study templates, related-verse discovery, and weighted progress analytics, with transactional bulk operations, notifications, and Pytest coverage.')],
 [('Tenant architecture','Architected a schema-per-tenant PostgreSQL ERP supporting approximately 25+ tenant environments with isolated business data.'),('Financial engine','Engineered double-entry accounting with idempotent journal posting, multi-currency cost of goods sold, and controlled calculate-lock-finalize-post payroll workflows.'),('Transaction safety','Designed financial services handling more than 100,000 accounting records while preserving auditability and consistency.')],
 [('Learning journeys','Combined AI placement assessments and study plans with structured learning tracks and certificates.'),('Corporate operations','Supported corporate training agreements, localized pricing, and financial management across multiple countries.'),('Connected platform','Paired Next.js with Django REST APIs, PostgreSQL, and Django Channels for learning workflows and real-time messaging.')],
 [('Delivery operations','Developed 60+ API handlers covering tenants, branches, customers, delivery agents, catalogs, orders, and notifications.'),('Ledger & concurrency','Implemented an auditable prepaid-coupon ledger with reserved/available balances, immutable entries, row-level locking, constraints, and idempotent reserve-settle-release workflows.'),('Automation & reliability','Built atomic order lifecycles, WebSocket notifications, recurring Celery delivery tours, and reminders. Created 300+ tests across identity, tenant isolation, orders, concurrency-sensitive workflows, and scheduled tasks.')],
 [('Company isolation','Developed a multi-tenant B2B trade platform with isolated company data, financial workflows, and transaction-safe services.'),('Resilient imports','Built CSV/XLSX imports processing up to 50,000+ records per batch. Per-record transactions isolated failures while preserving successful imports.'),('Financial reporting','Implemented automated balance-sheet aggregation and multi-currency foreign-exchange tracking for trade reporting.')],
]
for i,p in enumerate(projects):
 base(i+3,f'{i+1:02d} / '+p['title'].replace(' (بيعة)',''))
 para(p['label'].upper(),M,70,CW,'label')
 para(p['title'].replace(' (بيعة)',''),M,92,CW,'title')
 image(ROOT/'public'/p['image'].lstrip('/'),M,145,CW,207)
 para('CONCEPTUAL PROJECT ARTWORK',M,358,CW,'small')
 # Metrics strip
 c.setFillColor(PAPER); c.roundRect(M,H-436,CW,49,7,fill=1,stroke=0)
 for j,s in enumerate(p['stats']):
  x=M+12+j*CW/3
  txt(s['value'],x,394,14,'Bold',ACC); txt(s['label'],x,416,8,color=MUTED)
 y=454
 for title,body in details[i]:
  y=para(title,M,y,CW,'label')+4
  y=para(html.escape(body),M,y,CW,'body')+12
 assert y < 724, (p['title'],y)
 para('TECHNOLOGIES',M,720,CW,'label')
 para(' / '.join(p['technologies']),M,737,CW,'small')
 if p.get('liveUrl'): link(p['liveUrl'].replace('https://','').rstrip('/'),p['liveUrl'],M,766)
 else:
  for j,a in enumerate(p['appLinks']):
   x=M+j*CW/2; txt(a['label'],x,760,8,color=MUTED)
   link('Google Play',a['googlePlay'],x,776); link('App Store',a['appStore'],x+82,776)
 c.showPage()

base(11,'09 / Negm Feed')
para('BUSINESS OPERATIONS SOFTWARE',M,75,CW,'label')
para('Negm Feed',M,99,CW,'title')
para('Invoicing, payments,<br/>and financial reporting.',M,158,CW,'title')
para('Developed Django modules and REST APIs for day-to-day business operations, covering financial and operational workflows.',M,247,CW)
y=324
for title,body in [
 ('Invoicing & payments','Built invoicing and payment-processing APIs, with Stripe integration for payment workflows.'),
 ('Client & employee management','Developed modules and APIs for client and employee management, alongside balance summaries.'),
 ('Reporting & documents','Implemented financial reporting and WeasyPrint-based PDF generation for financial and operational reports.')]:
 y=heading(title.upper(),y); y=para(body,M,y,CW)+24
line(580)
para('TECHNOLOGIES',M,603,CW,'label'); para('Django / REST APIs / Stripe / WeasyPrint',M,624,CW)
para('LET\'S BUILD SOMETHING USEFUL.',M,688,CW,'label')
link('zeyadslama23@gmail.com','mailto:zeyadslama23@gmail.com',M,714)
link('GitHub','https://github.com/Demo-23home',M,739); link('LinkedIn','https://www.linkedin.com/in/demo-23home/',M+80,739)
txt('+20 101 759 5972',M+180,739,9,color=MUTED)
c.save()
# Verify text, page count, and link annotations; render a contact sheet and individual pages.
doc=pymupdf.open(OUT); assert len(doc)==11
for p in projects: assert p['title'].replace(' (بيعة)','') in ''.join(pg.get_text() for pg in doc)
assert sum(len(pg.get_links()) for pg in doc)>=15
thumbs=[]
for i,pg in enumerate(doc):
 pix=pg.get_pixmap(matrix=pymupdf.Matrix(1.3,1.3)); path=ROOT/f'tmp/pdfs/page-{i+1:02d}.png'; pix.save(path)
 im=Image.open(path); im.thumbnail((298,421)); thumbs.append(im.copy())
sheet=Image.new('RGB',(298*4,421*3),'#dce4e1')
for i,im in enumerate(thumbs): sheet.paste(im,((i%4)*298,(i//4)*421))
sheet.save(ROOT/'tmp/pdfs/contact-sheet.jpg')
print(f'Created {OUT}: {len(doc)} pages, {sum(len(pg.get_links()) for pg in doc)} links')
