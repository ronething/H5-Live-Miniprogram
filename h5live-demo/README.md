# video 详解

视频时长不是在创建 `video` 之后就可以拿到 （为 NaN）

要加载完视频元数据才可以拿到

会触发 `durationchange` 事件

有时候并不能一次性就拿到全部时长

跟视频格式有关系。（例如 ts ？ 一段一段拿到）

元数据拿到之后 会先触发 `durationchange` 事件 然后再触发 `loadedmetadata` 事件

有先后顺序

`loadeddata` 需要继续下载视频帧和音频帧

`progress` 事件 表示正在下载视频帧和音频帧

`play` 从暂停状态到播放状态就会触发的事件

`seeked` 表示 `seeking` 结束 `canplay` 之后 再 `canplaythrough`

`seeking`触发 然后 `seeked` 之前会有 `waiting` 事件触发

`playing` `play`之后的事件 如果是有 `seeking` 则 `play` `waiting` `seeked` `canplay` `playing`



