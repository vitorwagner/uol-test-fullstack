FROM python:3.8-slim-buster

WORKDIR /server

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 3001

CMD ["python3", "app.py"]