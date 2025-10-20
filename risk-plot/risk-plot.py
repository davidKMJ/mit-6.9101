import matplotlib.pyplot as plt

risk_data = {
    "U1": 20,
    "U2": 25,
    "U3": 6,
    "U4": 12,
    "U5": 16,
    "U6": 9,
    "U7": 20,
}

sorted_tuple_risk_data = sorted(
    risk_data.items(), key=lambda x: x[1], reverse=True
)

labels = [x[0] for x in sorted_tuple_risk_data]
risks = [x[1] for x in sorted_tuple_risk_data]
threshold = 15

plt.figure(figsize=(12, 6))
bars = plt.bar(labels, risks, color="#0077b6")

for bar in bars:
    if bar.get_height() > threshold:
        bar.set_color("#ef476f")

plt.axhline(
    y=threshold,
    color="#073b4c",
    linestyle="--",
    linewidth=2,
    label=f"Risk Tolerance Threshold ({threshold})",
)

plt.ylabel("Risk Score (Uncertainty x Importance)", fontsize=12)
plt.ylim(0, max(risks) + 5)
plt.legend()
plt.show()
