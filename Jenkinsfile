pipeline {

    agent any
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                script {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        sh 'npx playwright test'
                    }
                }
            }
        }

        stage('Reports') {
            steps {
                script {
                    publishHTML([allowMissing          : true,
                                 alwaysLinkToLastBuild : false,
                                 keepAll               : true,
                                 reportDir             : 'playwright-report',
                                 reportFiles           : 'index.html',
                                 reportName            : 'HTML Report',
                                 reportTitles          : '',
                                 useWrapperFileDirectly: true])
                }
            }
        }
    }
}
