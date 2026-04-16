# MDS + NetScaler L1 Operations Automation UI Mock

Bu klasör, Check Point MDS (R81.20) ve NetScaler operasyon akışlarını görselleştiren basit bir web UI taslağı içerir.

## Çalıştırma

```bash
python3 -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` açın.

## İçerik

- `index.html`: Sayfa iskeleti, workflow alanları ve execution feed tablosu.
- `styles.css`: Karanlık tema dashboard görünümü.
- `app.js`: Domain kartları, örnek execution feed ve basit etkileşimler.
