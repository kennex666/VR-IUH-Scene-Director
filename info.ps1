# Lấy ngày tháng năm hiện tại
$currentDate = Get-Date
# Lấy 2 số cuối của năm và tháng
$year = $currentDate.Year
$month = $currentDate.Month
# Trích xuất 2 số cuối của năm
$yearLastTwoDigits = $year.ToString().Substring(2, 2)
# Đảm bảo tháng luôn có 2 chữ số
$monthFormatted = $month.ToString("D2")

# Yêu cầu nhập tên tác giả
$authorName = "@Kennex666 x @EchhOpp"


# Lấy short commit hash, số lượng commit và thời gian commit
$commitHash = git rev-parse --short HEAD
$buildNumber = git rev-list --count HEAD
$commitDate = git log -1 --pretty=format:"%cd" | Out-String

# Loại bỏ khoảng trắng thừa
$commitHash = $commitHash.Trim()
$commitDate = $commitDate.Trim()


Write-Host "Current build: $buildNumber"

$version = Read-Host "Version (alpha, beta, development, production)"

# Tạo đối tượng JSON
$jsonObject = @{
    GitHubAuthors = $authorName
    commit = $commitHash
    buildNumber = $yearLastTwoDigits + $monthFormatted + "0" + $buildNumber # Format: YYMM0X
    appVersion = $version # Format: YY.MM.X
    commitDate = $commitDate
} | ConvertTo-Json -Depth 1

# Lưu vào file JSON với mã hóa UTF-8 không BOM
$path = "app_info.js"
[System.IO.File]::WriteAllText($path, "const APP_VERSION = " + $jsonObject, [System.Text.Encoding]::UTF8)

Write-Host "Git information has been saved to git_info.json"

git add app_info.js

git commit -m "ci: deploy app_info.js"

git push origin development