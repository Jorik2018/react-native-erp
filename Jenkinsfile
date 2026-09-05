pipeline {
    agent any

environment {
    DEPLOY_DIR = 'D:\\apps\\auth'
    BUILD_DIR  = 'dist'

    VITE_PATH_LOGIN = '/login2'

    NODE_VERSION = '22'
    PNPM_VERSION = '9.4.0'

    PNPM_HOME = 'D:\\tools\\pnpm'
    PATH = "D:\\tools\\pnpm;${env.PATH}"
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

                    echo ================================
                    echo ===== Nodist / Node Setup =====
                    echo ================================

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
                        exit /b 1
                    )

                    echo.
                    echo ===== Node Location =====
                    where node

                    echo.
                    echo ===== Node Version =====
                    node --version

                    node -e "const major=Number(process.versions.node.split('.')[0]); if(major < 22){ console.error('ERROR: Node 22+ required. Current:', process.version); process.exit(1) }"

                    if errorlevel 1 exit /b 1
                '''
            }
        }

stage('Setup PNPM') {
    steps {
        bat '''
            @echo off

            echo ==========================
            echo ===== PNPM Setup =====
            echo ==========================

            if not exist "%PNPM_HOME%" (
                echo Creating %PNPM_HOME%...
                mkdir "%PNPM_HOME%"
            )

            if not exist "%PNPM_HOME%\\pnpm.exe" (
                echo.
                echo pnpm not found.
                echo Downloading pnpm %PNPM_VERSION%...

                powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $ErrorActionPreference='Stop'; Invoke-WebRequest -UseBasicParsing -Uri 'https://github.com/pnpm/pnpm/releases/download/v%PNPM_VERSION%/pnpm-win-x64.exe' -OutFile '%PNPM_HOME%\\pnpm.exe'"

                if errorlevel 1 (
                    echo ERROR: Could not download pnpm
                    exit /b 1
                )
            ) else (
                echo pnpm already installed.
            )

            echo.
            echo ===== PNPM Location =====
            where pnpm

            if errorlevel 1 (
                echo ERROR: pnpm is not available in PATH
                exit /b 1
            )

            echo.
            echo ===== PNPM Version =====
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

                    echo ============================
                    echo ===== Environment =====
                    echo ============================

                    echo.
                    echo ===== Git =====
                    where git

                    if errorlevel 1 (
                        echo ERROR: Git not found
                        exit /b 1
                    )

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

                    echo Project environment OK
                '''
            }
        }

        stage('Install') {
            steps {
                bat '''
                    @echo off

                    echo ==========================
                    echo ===== Install =====
                    echo ==========================

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

                    echo ========================
                    echo ===== Build =====
                    echo ========================

                    echo VITE_PATH_LOGIN=%VITE_PATH_LOGIN%

                    call pnpm build

                    if errorlevel 1 (
                        echo ERROR: Build failed
                        exit /b 1
                    )

                    echo.
                    echo Verifying build...

                    if not exist "%BUILD_DIR%\\index.html" (
                        echo ERROR: %BUILD_DIR%\\index.html not found
                        exit /b 1
                    )

                    echo Build OK
                '''
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    @echo off

                    echo =========================
                    echo ===== Deploy =====
                    echo =========================

                    if not exist "%DEPLOY_DIR%" (
                        echo Creating %DEPLOY_DIR%...
                        mkdir "%DEPLOY_DIR%"
                    )

                    echo.
                    echo Cleaning %DEPLOY_DIR%...

                    del /F /Q "%DEPLOY_DIR%\\*" 2>nul

                    for /D %%D in ("%DEPLOY_DIR%\\*") do (
                        rd /S /Q "%%D"
                    )

                    echo.
                    echo Copying %BUILD_DIR% to %DEPLOY_DIR%...

                    xcopy "%BUILD_DIR%\\*" "%DEPLOY_DIR%\\" /E /I /Y /Q

                    if errorlevel 1 (
                        echo ERROR: Deployment copy failed
                        exit /b 1
                    )

                    echo.
                    echo Verifying deployment...

                    if not exist "%DEPLOY_DIR%\\index.html" (
                        echo ERROR: Deployment verification failed
                        exit /b 1
                    )

                    echo.
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