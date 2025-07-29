import random

def get_yield_data():
    # Simulated yield data for vaults
    vaults = [
        {"name": "ETH Vault", "apy": round(random.uniform(3, 8), 2)},
        {"name": "USDC Vault", "apy": round(random.uniform(5, 10), 2)},
        {"name": "WBTC Vault", "apy": round(random.uniform(2, 6), 2)},
    ]
    return {"vaults": vaults}
