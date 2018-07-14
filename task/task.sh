#!/bin/bash
#byLeal
#July 2018
#
# EXAMPLE TASK
# --------------------------------------------------------------------------------
# TASK.SH Script executes a login in a Windows Machine and runs a task(s) 
#      (the task(s) need to be on the Startup Script for the User).
#
# This example Use Case is intended for Graphical Applications that need a User 
#      Logged In to run properly (e.g.: Cannot be started as a Service).
#
# IMPORTANT: If the application(s) executed need to keep running, 
#            the Startup Script (task(s)) need to execute tsdiscon.exe at the end.
# --------------------------------------------------------------------------------
Xvfb :19 -screen 0 "${SCREENRESOLUTION}x16" 2>/dev/null &
export DISPLAY=:19
/opt/freerdp-nightly/bin/xfreerdp /cert-ignore /u:"${USERNAME}" /p:"${USERPASSWD}" /size:"${SCREENRESOLUTION}" /v:"${HOSTADDR}" 2>/dev/null
echo "ETRADE System ONLINE!"
exit 0
