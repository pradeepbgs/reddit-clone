#!/bin/bash

set -e

echo " Configuring EAS project..."
eas build:configure

echo "Building Android APK..."
eas build -p android --profile preview
