from ultralytics import YOLO

# Caminho do modelo YOLO salvo localmente
model_path = "C:/Users/Utilizador/Desktop/yolo11n.pt"  # Altere conforme necessário

# Carregar o modelo YOLO localmente (rodando apenas na CPU)
model = YOLO(model_path)

# Caminho da imagem a ser analisada
image_path = "C:/Users/Utilizador/Desktop/imagem.jpg"  # Altere conforme necessário

# Fazer a inferência na imagem SEM CUDA (apenas CPU)
results = model.predict(image_path, imgsz=640, conf=0.5)

# Exibir as detecções
for result in results:
    result.show()  # Abre a imagem com as detecções
