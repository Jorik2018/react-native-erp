pipeline {
    agent any

    environment {
        DEPLOY_DIR = 'D:\\apps\\auth'
        BUILD_DIR  = 'dist'

        VITE_PATH_LOGIN = '/login2'

        NODE_VERSION = '22'
        NPM_VERSION  = '10'
        PNPM_VERSION = '9.4.0'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node and NPM') {
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
                    echo ===== Selecting Node %NODE_VERSION% =====
                    call nodist %NODE_VERSION%

                    if errorlevel 1 (
                        echo ERROR: Could not activate Node %NODE_VERSION%
                        exit /b 1
                    )

                    echo.
                    echo ===== Node =====
                    where node
                    node --version

                    echo.
                    echo ===== Selecting NPM %NPM_VERSION% =====
                    call nodist npm %NPM_VERSION%

                    if errorlevel 1 (
                        echo ERROR: Could not activate NPM %NPM_VERSION%
                        exit /b 1
                    )

                    echo.
                    echo ===== NPM =====
                    where npm
                    call npm --version

                    if errorlevel 1 (
                        echo ERROR: npm is not working
                        exit /b 1
                    )
                '''
            }
        }

        stage('Setup PNPM') {
            steps {
                bat '''
                    @echo off

                    echo ===== PNPM =====

                    where pnpm >nul 2>&1

                    if errorlevel 1 (
                        echo pnpm not found.
                        echo Installing pnpm %PNPM_VERSION%...

                        call npm install -g pnpm@%PNPM_VERSION%

                        if errorlevel 1 (
                            echo ERROR: Could not install pnpm
                            exit /b 1
                        )
                    )

                    echo.
                    echo ===== PNPM LOCATION =====
                    where pnpm

                    echo.
                    echo ===== PNPM VERSION =====
                    call pnpm --version

                    if errorlevel 1 (
                        echo ERROR: pnpm is not working
                        exit /b 1
                    )
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
                    echo ===== Node =====
                    where node
                    node --version

                    echo.
                    echo ===== NPM =====
                    where npm
                    call npm --version

                    echo.
                    echo ===== PNPM =====
                    where pnpm
                    call pnpm --version

                    echo.
                    echo ===== Project =====

                    if not exist package.json (
                        echo ERROR: package.json not found
                        exit /b 1
                    )

                    if not exist pnpm-lock.yaml (
                        echo ERROR: pnpm-lock.yaml not found
                        exit /b 1
                    )

                    echo.
                    echo ===== Validate Node =====

                    node -e "const major=Number(process.versions.node.split('.')[0]); if(major < 22){ console.error('ERROR: Node 22+ required. Current:', process.version); process.exit(1) }"

                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Install') {
            steps {
                bat '''
                    @echo off

                    echo ===== Install dependencies =====
                    call pnpm install --frozen-lockfile

                    if errorlevel 1 (
                        echo ERROR: pnpm install failed
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

                    call pnpm build

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