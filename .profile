#!/usr/bin/bash

logo='
   HHHH               HHHH
   HHHHHHHH           HHHHHHHH
   HHHHHHHH           HHHHHHHH
   HHHHHHHH           HHHHHHHH
   HHHHHHHHHHHHHHHHHHHH  HHHHH
   HHHHHHHHHHHHHHHHHHHHHHHHH
     HHHHHHHHHHHHHHHHHHHHHHHHH
   HHHH  HHHHHHHHHHHHHHHHHHHHH
   HHHHHHHH           HHHHHHHH
   HHHHHHHH           HHHHHHHH
   HHHHHHHH           HHHHHHHH
       HHHH               HHHH
'

timenow="$(date +'%H:%M')"
load="$(awk '{print $1 ", " $2 ", " $3}' /proc/loadavg)"

printf '\e[0;35m%s\n\e[0m' "$logo"
printf 'Welcome back! The time now is %s UTC\n' "$timenow"
printf 'Server load: %s\n' "$load"
printf '\n'
printf 'Link to hPanel: \n'
printf 'https://hpanel.hostinger.com/ \n'
printf '\n'
