pipeline {
    agent any

    environment {
        DEPLOY_DIR = 'D:\\apps\\auth'
        BUILD_DIR  = 'dist'

        VITE_PATH_LOGIN = '/login2'

        NODE_VERSION = '22'
        PNPM_VERSION = '9.4.0'
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
                        echo ERROR: Node %NODE_VERSION% is not installed
                        exit /b 1
                    )

                    echo.
                    echo ===== Node =====
                    node --version

                    echo.
                    echo ===== Corepack =====
                    where corepack

                    echo.
                    echo Enabling pnpm %PNPM_VERSION%...
                    call corepack enable
                    call corepack prepare pnpm@%PNPM_VERSION% --activate

                    if errorlevel 1 (
                        echo ERROR: Could not activate pnpm
                        exit /b 1
                    )

                    echo.
                    echo ===== PNPM =====
                    call pnpm --version
                '''
            }
        }

        stage('Environment') {
            steps {
                bat '''
                    @echo off

                    echo ===== Git =====
                    where git
                    git --version

                    echo.
                    echo ===== Node =====
                    where node
                    node --version

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