# 直播源制作

-   方法一

## 安装 `nginx`

```sh
brew tap denji/nginx
brew install nginx-full --with-rtmp-module
```

```
- Tips -
Run port 80:
 $ sudo chown root:wheel /usr/local/opt/nginx-full/bin/nginx
 $ sudo chmod u+s /usr/local/opt/nginx-full/bin/nginx
Reload config:
 $ nginx -s reload
Reopen Logfile:
 $ nginx -s reopen
Stop process:
 $ nginx -s stop
Waiting on exit process
 $ nginx -s quit

To have launchd start denji/nginx/nginx-full now and restart at login:
  brew services start denji/nginx/nginx-full
Or, if you don't want/need a background service you can just run:
  nginx
```

-   访问 `http://127.0.0.1:8080`

![](https://i.loli.net/2018/12/05/5c06b6af60523.png)

## 安装 `ffmpeg`

```
brew install ffmpeg
```

## `nginx.conf` 配置

> 详见目录下 `nginx.conf`

`http` 块中

```nginx
        location /hls {
            types{
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /usr/local/var/www;
            add_header Cache-Control no-cache;
        }
```

文件尾

```nginx
rtmp{
    server {
        listen 1935;
        chunk_size 4000;

        # RTMP 直播流配置
        application rtmplive {
            live on;
            max_connections 1024;
        }

        # hls 直播流配置
        application hls {
            live on;
            hls on;
            hls_path /usr/local/var/www/hls;
            hls_fragment 5s; 
        }
    }
}
```

## 推流

-   `rtmp`

启动 `server` 作用相当于方法一的 `nginx`

![](https://i.loli.net/2018/12/05/5c06c93f59032.png)

```
ffmpeg -re -i test.mp4 -vcodec libx264 -acodec aac -f flv rtmp://127.0.0.1:1935/rtmplive/rtmp
```

`vlc` 打开网络 (open network) `rtmp://127.0.0.1:1935/rtmplive/rtmp`

![](https://i.loli.net/2018/12/05/5c06bf0ee7d1d.png)

-   `hls`

```
ffmpeg -re -i test.mp4 -vcodec libx264 -acodec aac -f flv rtmp://127.0.0.1:1935/hls/stream
```

`Safari` 打开网页 `http://127.0.0.1:8080/hls/stream.m3u8`

![](https://i.loli.net/2018/12/05/5c06c1809f5de.png)

---


-   方法二

```
ffmpeg -re -i test.mp4 -c copy -f flv rtmp://127.0.0.1:1935/live/movie
```

验证方法与方法一一样

```
rmtp://127.0.0.1:1935/live/movie
http://127.0.0.1:7001/live/movie.flv
http://127.0.0.1:7002/live/movie.m3u8
```

![](https://i.loli.net/2018/12/05/5c06c698e4bda.png)

![](https://i.loli.net/2018/12/05/5c06c668b44b7.png)