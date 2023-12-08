## Usefull links

- [astexplorer](https://astexplorer.net/)
- [mobilepalette](https://mobilepalette.colorion.co/)
- [floating-ui](https://floating-ui.com/)

----

## TODO

- jsdoc
- check redux normalization
- roadmap for progress
- host images from some folder
- course progress in tab right in article details
- change-log file by commit
- react-virtualized deprecated change to react-window or react-virtuoso
- eslint css property order
- site tour
- html report must be here https://barklim.github.io/courses/report.html
- react query
- React.StrictMode

----

## Deploy

### deploy node js to vercel

npm i -g vercel
vercel --prod

Получаем две ссылки
https://vercel.com/klimentbarkalov/production-project-server/A2n46994xUbKJZnMfaBm4dAdp6hy
https://production-project-server-opal.vercel.app/
На netlify получаем ссылку
https://harmonious-heliotrope-135b77.netlify.app/

### Облачный сервер ssh

Используем для примера selectel. Получаем сервер, айпишник и пароль подключения.

Подключаемся:
ssh root@80.93.190.163
sudo apt update
sudo apt install git-all

Клонируем приватный проект: sudo ssh-keygen
Сохраняем ключ в: /root/.ssh/project
В папке ~/.ssh cоздаем конфиг файл с найстройкими для гитхаба, с содержимым ниже: cat > config
Host production-project
Hostname github.com
User git
IdentityFile ~/.ssh/project

Проверяем содержимое: cat config

Запускаем vim: vim project
Чтобы выйти из vim нажимаем esc, затем вводим: :q!

Получаем ключ, для того чтобы указать его в гитхабе: sudo cat project.pub
Добавлем полученный ключ в гитхабе в Deploy keys

Далее можно клонировать, по команде по ssh: git clone git@github.com:utimur/production-project.git
(или git clone production-project:utimur/production-project.git)

Установка nvm: curl -o- https://... , wget -qO ... , export ...
nvm install 17.4.0, npm i, npm run start:dev
Приложение доступно по адресу: 80.93.190.163:3000, 80.93.190.163:8000/users

### nginx

sudo apt install nginx
Из корня переходим в: cd /etc/nginx
cd sites-enabled/
ls, vim default

Тут есть переменная root напротив, которой должно быть:
root /var/www/production_project/html;

Выходим из вим и проверяем то, что синтаксис ок: nginx -t
Перезапускаем nginx: sudo service nginx restart
Переходим в корень, а далее: cd var/www/
Тут лежит файл 404, который можно увдидеть перейдя на 80.93.190.163 в браузере
Создаем здесь наш проект: mkdir production_project
Переходим в него: cd production_project
Далее создаем: mkdir html
Видим ранее указанный путь: pwd

cd production-project
npm run build:prod mode=production apiUrl="http://80.93.190.163:8000"
Перемещаем сборку: mv root/production/build var/www/production_project/
Удялем html: rmdir html
А сборку переименовываем в html: mv build html

Сейчас перезагрузка на сратинице 80.93.190.163:about возвращает 404, чтобы это исправить
Возвращаемся в: cd /etc/nginx/sites-enabled/
В location должно быть: try_files $uri $uri/ /index.html;
Нажимаем esс вводим :wq, чтобы изменения сохранились
sudo service ngninx restart

### nginx gzip

cd etc/nginx
vim nginx.conf
Убирем комментарии у всех gzip строчек: gzip_vary: on; ...
Переходим на reg.ru
После покупки, переходим в dns серверы, где добавляем айпишник нашего сервера
Далее переходим в selectel, делегировать домен, добавляем домен.
Из документации selectel, отсюда же копируем список dns серверов и вставляем в reg.ru
После индексирования reg.ru можно перейти в selectel и добавть записи во вкладке
dns хостинг. Записи: @ 80.93.190.163 и www 80.93.190.163
Теперь после некоторого времени, приложение доступно по купленному домену

cd production_project/
npm i -g pm2
pm2 start json-server/index.js

### ssl

На сайте letsencrypt описан процесс
Переходим на certbot.eff.org, выбираем настройки ubuntu&nginx
Проверяем установлин ли снап: snap --version
Далее устанавливаем: sudo snap install --classic certbot; sudo ln -s ...
Идем в /etc/nginx/sites-enabled/ и напротив serve_name вставляем наш домен
sudo serbot --nginx
Идем в production-project/json-server и под докам (how to create a https server)
nodejs создаем сертификат
openssl genrsa -out key.pem, ...
Пулим проект на сервер, останавливаем json бэк по айдишнику и запускаем:
pm2 list, pm2 stop 0, pm2 start json-server/index.js

В скрипте правим скрипт для сборки:
npm run build:prod mode=production apiUrl="https://production-project-server.vercel.app"
На сервере запускаем сборку npm run build:prod mode=production apiUrl="https://80.93.190.163:8443"
Переходим в: cd var/www/production_project/
rm -rf production_project/html/
Перемещаем сборку: mv ~/production-project/build/ /var/www/production-project/html

### Проксирование запросов, query params

Для того чтобы дать достуть на выполнение скрипта delpoy.sh
chmod +x deploy.sh
