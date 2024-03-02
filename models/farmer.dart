
import 'dart:convert';

List<Farmer> farmerFromJson(String str) => List<Farmer>.from(json.decode(str).map((x) => Farmer.fromJson(x)));

String farmerToJson(List<Farmer> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Farmer {
    Name name;
    double id;
    Product product;
    double weightKg;
    String arrival;
    String bestBefore;

    Farmer({
        required this.name,
        required this.id,
        required this.product,
        required this.weightKg,
        required this.arrival,
        required this.bestBefore,
    });

    factory Farmer.fromJson(Map<String, dynamic> json) => Farmer(
        name: nameValues.map[json["Name"]]!,
        id: json["id"]?.toDouble(),
        product: productValues.map[json["Product"]]!,
        weightKg: json["Weight(kg)"]?.toDouble(),
        arrival: json["Arrival"],
        bestBefore: json["BestBefore"],
    );

    Map<String, dynamic> toJson() => {
        "Name": nameValues.reverse[name],
        "id": id,
        "Product": productValues.reverse[product],
        "Weight(kg)": weightKg,
        "Arrival": arrival,
        "BestBefore": bestBefore,
    };
}

enum Name {
    AAMINA,
    ANUSHKA,
    DIVY,
    FAKIR,
    GULDASTA,
    GULNAZ,
    HANEEF,
    JAGDIESH,
    JASMEN,
    MEHNAZ,
    MEHTAB,
    MERCY,
    MONISH,
    NAKCHED,
    PATIK,
    PINKY,
    PRAMAL,
    PREETAM,
    PUSHPA,
    RAHU,
    RAISUDDIN,
    RAJBIR,
    RAMOTAR,
    RAMPAYARI,
    SANJEEV,
    SANTO,
    SAWAN,
    SHANTA,
    SHEFALI,
    VIJAYANTA
}

final nameValues = EnumValues({
    "aamina": Name.AAMINA,
    "anushka": Name.ANUSHKA,
    "divy": Name.DIVY,
    "fakir": Name.FAKIR,
    "guldasta": Name.GULDASTA,
    "gulnaz": Name.GULNAZ,
    "haneef": Name.HANEEF,
    "jagdiesh": Name.JAGDIESH,
    "jasmen": Name.JASMEN,
    "mehnaz": Name.MEHNAZ,
    "mehtab": Name.MEHTAB,
    "mercy": Name.MERCY,
    "monish": Name.MONISH,
    "nakched": Name.NAKCHED,
    "patik": Name.PATIK,
    "pinky": Name.PINKY,
    "pramal": Name.PRAMAL,
    "preetam": Name.PREETAM,
    "pushpa": Name.PUSHPA,
    "rahu": Name.RAHU,
    "raisuddin": Name.RAISUDDIN,
    "rajbir": Name.RAJBIR,
    "ramotar": Name.RAMOTAR,
    "rampayari": Name.RAMPAYARI,
    "sanjeev": Name.SANJEEV,
    "santo": Name.SANTO,
    "sawan": Name.SAWAN,
    "shanta": Name.SHANTA,
    "shefali": Name.SHEFALI,
    "vijayanta": Name.VIJAYANTA
});

enum Product {
    APPLE,
    BANANA,
    BRINJAL_LONG,
    BROCAULI,
    CARROT,
    GRAPES,
    JACK_FRUIT,
    LIME,
    MANGO,
    OKARA,
    PAPAYA,
    POTATO_RED,
    POTATO_WHITE,
    RADDISH_RED,
    TOMATO_BIG,
    TOMATO_SMALL
}

final productValues = EnumValues({
    "Apple": Product.APPLE,
    "Banana": Product.BANANA,
    "Brinjal Long": Product.BRINJAL_LONG,
    "Brocauli": Product.BROCAULI,
    "Carrot": Product.CARROT,
    "Grapes": Product.GRAPES,
    "Jack Fruit": Product.JACK_FRUIT,
    "Lime": Product.LIME,
    "Mango": Product.MANGO,
    "Okara": Product.OKARA,
    "Papaya": Product.PAPAYA,
    "Potato Red": Product.POTATO_RED,
    "Potato White": Product.POTATO_WHITE,
    "Raddish Red": Product.RADDISH_RED,
    "Tomato Big": Product.TOMATO_BIG,
    "Tomato Small": Product.TOMATO_SMALL
});

class EnumValues<T> {
    Map<String, T> map;
    late Map<T, String> reverseMap;

    EnumValues(this.map);

    Map<T, String> get reverse {
        reverseMap = map.map((k, v) => MapEntry(v, k));
        return reverseMap;
    }
}