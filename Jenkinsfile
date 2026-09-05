pipeline {
    agent any

    environment {
        DEPLOY_DIR = 'D:\\apps\\auth'
        BUILD_DIR  = 'dist'

        VITE_PATH_LOGIN = '/login2'

        NODE_VERSION = '20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                bat '''
                    @echo off

                    echo ===== Nodist =====
                    where nodist
                    if errorlevel 1 (
                        echo ERROR: Nodist not found
                        exit /b 1
                    )

                    echo.
                    echo Selecting Node %NODE_VERSION%...

                    call nodist %NODE_VERSION%
                    if errorlevel 1 (
                        echo ERROR: Could not activate Node %NODE_VERSION%
                        echo The version may not be installed.
                        exit /b 1
                    )

                    echo.
                    echo ===== Node =====
                    where node
                    node --version

                    echo.
                    echo ===== NPM =====
                    where npm
                    call npm --version
                '''
            }
        }

        stage('Environment') {
            steps {
                bat '''
                    @echo off

                    echo ===== Git =====
                    where git
                    if errorlevel 1 exit /b 1
                    git --version

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

                    echo.
                    echo ===== Validate Node version =====

                    node -e "const major=parseInt(process.versions.node.split('.')[0]); if(major < 20){ console.error('ERROR: Node 20 or newer required. Current:', process.version); process.exit(1) }"

                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Install') {
            steps {
                bat '''
                    @echo off

                    echo ===== Install dependencies =====
                    call npm ci

                    if errorlevel 1 (
                        echo ERROR: npm ci failed
                        exit /b 1
                    )
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                    @echo off

                    echo ===== Build =====
                    echo VITE_PATH_LOGIN=%VITE_PATH_LOGIN%

                    call npm run build

                    if errorlevel 1 (
                        echo ERROR: Build failed
                        exit /b 1
                    )

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

                    if errorlevel 1 (
                        echo ERROR: Deployment copy failed
                        exit /b 1
                    )

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