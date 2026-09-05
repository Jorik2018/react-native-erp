pipeline {
    agent any

environment {
    DEPLOY_DIR = 'D:\\apps\\auth'
    BUILD_DIR  = 'dist'

    VITE_PATH_LOGIN = '/login2'
}

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment') {
            steps {
                bat '''
                    @echo off

                    echo ===== Git =====
                    where git || exit /b 1
                    git --version

                    echo.
                    echo ===== Node =====
                    where node || (
                        echo ERROR: Node.js not found
                        exit /b 1
                    )
                    node --version

                    echo.
                    echo ===== NPM =====
                    where npm || (
                        echo ERROR: npm not found
                        exit /b 1
                    )
                    call npm --version

                    echo.
                    echo ===== Project =====
                    if not exist package.json (
                        echo ERROR: package.json not found
                        exit /b 1
                    )

                    if not exist package-lock.json (
                        echo ERROR: package-lock.json not found
                        exit /b 1
                    )
                '''
            }
        }

        stage('Install') {
            steps {
                bat '''
                    @echo off
                    call npm ci
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                    @echo off
                    call npm run build
                    if errorlevel 1 exit /b 1

                    if not exist "%BUILD_DIR%\\index.html" (
                        echo ERROR: %BUILD_DIR%\\index.html not found
                        exit /b 1
                    )
                '''
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    @echo off

                    if not exist "%DEPLOY_DIR%" (
                        mkdir "%DEPLOY_DIR%"
                    )

                    echo Cleaning %DEPLOY_DIR%...

                    del /F /Q "%DEPLOY_DIR%\\*" 2>nul

                    for /D %%D in ("%DEPLOY_DIR%\\*") do (
                        rd /S /Q "%%D"
                    )

                    echo Copying %BUILD_DIR%...

                    xcopy "%BUILD_DIR%\\*" "%DEPLOY_DIR%\\" /E /I /Y /Q

                    if errorlevel 1 exit /b 1

                    if not exist "%DEPLOY_DIR%\\index.html" (
                        echo ERROR: Deployment verification failed
                        exit /b 1
                    )

                    echo Deploy OK
                '''
            }
        }
    }

    post {
        success {
            echo 'Auth application deployed successfully.'
        }

        failure {
            echo 'Auth application build/deploy failed.'
        }
    }
}