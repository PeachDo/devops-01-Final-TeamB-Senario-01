# devops-01-Final-TeamB
## 이도연 / 임지윤 / 서현준 / 이희성
### 시나리오 01
소비자가 예약을 진행할 때, 예약 정보를 RDS에 저장하고, 이후 드라이버가 이를 인지할 수 있도록 해당 메시지를 알림 서버에 전달해야 합니다.
데이터 내구성을 보장하기 위해 RDS는 복제본이 만들어져야 하며, 빠른 예약 정보 검색을 위해 쿼리결과는 ElastiCache를 통해 캐싱이 되어야 합니다.
예약 내역이 담긴 메시지 누적은 Elasticsearch를 통해 제공됩니다.
* * *
**Description** \
소비자가 예약을 진행할 때, 예약 정보를 RDS에 저장한다.
드라이버가 예약을 인지할 수 있도록 해당 메시지를 알림 서버에 전달한다.
예약 정보를 다루는 서버는 추가 될 트래픽에 대한 확장성이 보장되어야한다.
알림 서버는 추가 될 트래픽에 대한 확장성이 보장되어야한다.
데이터 내구성을 보장하기 위해 RDS는 복제본이 만들어져야 한다.
빠른 예약 정보 검색을 위해 쿼리결과는 ElastiCache를 통해 캐싱이 되어야 한다.
예약 내역이 담긴 메시지 누적은 Elasticsearch를 통해 제공된다.
api 서버에서 발생되어 누적된 어플리케이션 로그는 클라우드 와치를 통해 정제된다.
정제된 로그들은 예약 정보를 담는 rds와는 별도로 opensearch에서 저장, 출력된다.
예약 서비스와 조회 서비스는 별도로 관리되는 서비스이다.

* * *
**Architecture** 
\
\
<img width="859" alt="아키텍처ver 수정본" src="https://user-images.githubusercontent.com/38162105/172106605-a929b44c-942f-4464-a1cf-bdcb15725759.PNG">
\
* * *
**Environment**  
<div>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
<img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=aws&logoColor=white">
<img src="https://img.shields.io/badge/terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=#7B42BC"> 
</div>  

Iac : terraform(hcl)  

Language : javascript, shell  

Os : Ubuntu 20.04 LTS  
* * *
**Prerequisites**

AWS 배포 자동화를 구현하기 위해서는 AWS에 계정이 있어야 합니다. 

```
https://aws.amazon.com/ko/
```  
AWS 인프라를 구축 하기 위해 최상위 레포지토리에서 다음을 실행합니다.

```
terraform init
terraform plan
terraform apply
```

데이터베이스에 값을 넣기 위해서는 init.sql 파일이 위치한 곳에서 다음을 실행합니다.

```
mysql -h [데이터베이스 엔드포인트] -u [데이터베이스 사용자명] -P 3306 -p [데이터베이스 사용자 비밀번호]
create database reservations
use reservations
source init.sql
```

* * *
**Installing**  
*npm dependencies*
```
npm install mysql
npm install body-parse
npm install express
npm install nodemon
npm install dotenv
npm install express
npm install sqs-producer

```  

서버 구동을 위해 ./app 의 위치에서 다음을 실행합니다.
다음은 package.json 의 스크립트 아래에 nodemon으로 서버를 구동하도록 설정 해 놓은 명령어입니다.
```
npm run dev
```

**plugins**
```
sudo apt install redis-server
sudo apt install mysql-server
sudo apt install mysql-client-core8.0
```
* * *

**License**

이 프로젝트는 코드스테이츠 DevOps 부트 캠프 1기 community에서 라이센스를 소유하고 있습니다.  

* * *  
**Acknowledgments**  

이 프로젝트를 실행해 보시고 싶으신 분들은 aws 서비스에 대한 숙지가 꼭 필요합니다.  
데이터베이스에 값을 미리 넣어두고 실행 해 주세요.
