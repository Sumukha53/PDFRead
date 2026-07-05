from pathlib import Path
import urllib.request
import urllib.parse
import mimetypes
import os

pdf_bytes = b'%PDF-1.4\n1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n4 0 obj<< /Length 44 >>stream\nBT /F1 18 Tf 50 80 Td (Hello PDF) Tj ET\nendstream\nendobj\n5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000062 00000 n \n0000000119 00000 n \n0000000207 00000 n \n0000000305 00000 n \ntrailer<< /Size 6 /Root 1 0 R >>\nstartxref\n0\n%%EOF\n'
Path('test.pdf').write_bytes(pdf_bytes)

boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
body = []
body.append(f'--{boundary}\r\n'.encode())
body.append(b'Content-Disposition: form-data; name="file"; filename="test.pdf"\r\n')
body.append(b'Content-Type: application/pdf\r\n\r\n')
body.append(pdf_bytes + b'\r\n')
body.append(f'--{boundary}--\r\n'.encode())
body_bytes = b''.join(body)

req = urllib.request.Request('http://127.0.0.1:8000/upload', data=body_bytes, method='POST')
req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')

try:
    with urllib.request.urlopen(req, timeout=120) as response:
        print(response.status)
        print(response.read().decode())
except Exception as e:
    print(type(e).__name__, e)
