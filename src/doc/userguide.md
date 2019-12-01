## Introduction

The Round Off Value operator is a WireCloud operator that provides a simple mechanism of rounding off value list, produced by an output endpoint.

## Settings

- **Action when an invalid value:** Action when an invalid value received. Throw exception, remove value or pass through.
- **Math:** Math function for roundfing off. No operation, Math.round, Math.floor, Math.ceil or Math.trunc.
- **Decimal point:** Rounding digits, Integer, first decimal place, second decimal place or third decimal place.
- **Send Nulls:** Enable this option to propagate null values, leave it disable to filter null events.

## Wiring

### Input Endpoints

- Input : Array of numbers  e.g. [123.4, "567.8"]

### Output Endpoints

- Output : Array of numbers rounded off  e.g. [123, 568]

## Usage

## Reference

- [FIWARE Mashup](https://mashup.lab.fiware.org/)
