stage('Setup Node and npm') {
    steps {
        bat '''
            @echo off

            echo ===== Nodist =====
            where nodist
            if errorlevel 1 exit /b 1

            echo.
            echo ===== Node =====
            call nodist %NODE_VERSION%
            if errorlevel 1 exit /b 1

            node --version

            echo.
            echo ===== npm =====
            call nodist npm 10

            if errorlevel 1 (
                echo ERROR: Could not activate npm 10
                exit /b 1
            )

            call npm --version
        '''
    }
}