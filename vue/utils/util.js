import request from "./request";
// 导出Excel公用方法
export function exportMethod (data) {
    return request({
        method: data.method,
        url: `${data.url}${data.params ? '?' + data.params : ''}`,
        responseType: 'blob'
    }).then((res) => {
        const link = document.createElement('a')
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)

        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = data.fileName //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }).catch(error => {
        this.$message.error({
            title: '错误',
            desc: '网络连接错误'
        })
        console.log(error)
    })
}