#!/bin/bash
# Taken from http://stackoverflow.com/a/26791468

# Read /proc/stat file (for first datapoint)
read cpu user nice system idle iowait irq softirq steal guest< /proc/stat

# compute active and total utilizations
cpu_active_prev=$((user+system+nice+softirq+steal))
cpu_total_prev=$((user+system+nice+softirq+steal+idle+iowait))

sleep 0.05

# Read /proc/stat file (for second datapoint)
read cpu user nice system idle iowait irq softirq steal guest< /proc/stat

# compute active and total utilizations
cpu_active_cur=$((user+system+nice+softirq+steal))
cpu_total_cur=$((user+system+nice+softirq+steal+idle+iowait))

# compute CPU utilization (%)
cpu_util=$((100*( cpu_active_cur-cpu_active_prev ) / (cpu_total_cur-cpu_total_prev) ))

printf "$cpu_util"

exit 0
